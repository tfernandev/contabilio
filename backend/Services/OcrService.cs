using Tesseract;
using System.Text.RegularExpressions;

namespace backend.Services;

public interface IOcrService
{
    Task<OcrResult> AnalyzeImageAsync(Stream imageStream);
}

public class OcrResult
{
    public string Titular { get; set; } = "No detectado";
    public string Cuit { get; set; } = "No detectado";
    public string DocumentType { get; set; } = "Comprobante Desconocido";
    public decimal TotalAmount { get; set; }
    public string Period { get; set; } = "Desconocido";
    public string RiskAlert { get; set; } = string.Empty;
}

public class OcrService : IOcrService
{
    private readonly ILogger<OcrService> _logger;
    private readonly string _tessDataPath;

    public OcrService(ILogger<OcrService> logger, IWebHostEnvironment env)
    {
        _logger = logger;
        // La carpeta tessdata debe estar en la raíz de la app o en el lugar configurado
        _tessDataPath = Path.Combine(env.ContentRootPath, "tessdata");
    }

    public async Task<OcrResult> AnalyzeImageAsync(Stream imageStream)
    {
        return await Task.Run(() =>
        {
            try
            {
                using var engine = new TesseractEngine(_tessDataPath, "spa", EngineMode.Default);
                
                // Convertimos el stream a un array de bytes para cargarlo en Pix
                using var ms = new MemoryStream();
                imageStream.CopyTo(ms);
                var imageBytes = ms.ToArray();

                using var img = Pix.LoadFromMemory(imageBytes);
                using var page = engine.Process(img);
                
                var text = page.GetText();
                _logger.LogInformation("Texto extraído de OCR: {Text}", text);

                return ParseText(text);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error procesando OCR");
                throw;
            }
        });
    }

    private OcrResult ParseText(string text)
    {
        var result = new OcrResult();

        // 1. Buscar CUIT (20-12345678-9)
        var cuitRegex = new Regex(@"\d{2}-\d{8}-\d{1}");
        var cuitMatch = cuitRegex.Match(text);
        if (cuitMatch.Success)
        {
            result.Cuit = cuitMatch.Value;
        }

        // 2. Buscar Monto Total
        // Intentamos encontrar algo como "Total $ 1.234,56" o "Importe: 450,00"
        var amountRegex = new Regex(@"(?i)(total|monto|final|pagar|importe|total[^\d]+)[:\s]*\$?\s*([\d\.]+(,\d{2})?)");
        var amountMatch = amountRegex.Match(text);
        if (amountMatch.Success)
        {
            var amountStr = amountMatch.Groups[2].Value.Replace(".", "").Replace(",", ".");
            if (decimal.TryParse(amountStr, System.Globalization.CultureInfo.InvariantCulture, out decimal amount))
            {
                result.TotalAmount = amount;
            }
        }

        // 3. Detectar tipo de documento basado en palabras clave
        if (text.Contains("AGIP", StringComparison.OrdinalIgnoreCase) || text.Contains("Inmobiliario", StringComparison.OrdinalIgnoreCase))
        {
            result.DocumentType = "Boleta de Deuda (AGIP)";
            result.Titular = "Contribuyente Detectado";
        }
        else if (text.Contains("AFIP", StringComparison.OrdinalIgnoreCase) || text.Contains("Factura", StringComparison.OrdinalIgnoreCase))
        {
            result.DocumentType = "Factura Electrónica (ARCA/AFIP)";
        }

        // Simulación de una alerta basada en palabras clave
        if (text.Contains("Mora", StringComparison.OrdinalIgnoreCase) || text.Contains("Vencido", StringComparison.OrdinalIgnoreCase))
        {
            result.RiskAlert = "Se detectaron indicios de deuda vencida en el documento.";
        }

        return result;
    }
}
