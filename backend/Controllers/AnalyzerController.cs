using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyzerController : ControllerBase
{
    private readonly ILogger<AnalyzerController> _logger;
    private readonly IOcrService _ocrService;

    public AnalyzerController(ILogger<AnalyzerController> logger, IOcrService ocrService)
    {
        _logger = logger;
        _ocrService = ocrService;
    }

    [HttpPost("analyze")]
    [DisableRequestSizeLimit]
    public async Task<IActionResult> Analyze(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No se ha proporcionado ningún archivo.");

        _logger.LogInformation("Iniciando OCR real para archivo: {FileName}, Tamaño: {Size}", file.FileName, file.Length);
        
        try 
        {
            using var stream = file.OpenReadStream();
            var result = await _ocrService.AnalyzeImageAsync(stream);
            
            _logger.LogInformation("Análisis OCR completado para CUIT: {Cuit}", result.Cuit);
            
            return Ok(new
            {
                titular = result.Titular,
                cuit = result.Cuit,
                documentType = result.DocumentType,
                totalAmount = result.TotalAmount,
                period = result.Period,
                riskAlert = result.RiskAlert
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error durante el análisis del documento.");
            return StatusCode(500, "Error interno al procesar el OCR del documento.");
        }
    }
}
