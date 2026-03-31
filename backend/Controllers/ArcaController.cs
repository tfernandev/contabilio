using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArcaController : ControllerBase
{
    private readonly ILogger<ArcaController> _logger;
    private readonly ContabilioDbContext _db;

    public ArcaController(ILogger<ArcaController> logger, ContabilioDbContext db)
    {
        _logger = logger;
        _db = db;
    }

    [HttpGet("profile/{taxId}")]
    public async Task<IActionResult> GetProfile(string taxId)
    {
        _logger.LogInformation("Recuperando perfil ARCA para CUIT: {TaxId}", taxId);
        
        var profile = await _db.UserProfiles
            .FirstOrDefaultAsync(u => u.Cuit == taxId);

        if (profile == null)
            return NotFound("Usuario no registrado en el padrón local.");

        return Ok(new
        {
            cuit = profile.Cuit,
            fullName = profile.FullName,
            regime = profile.Regime,
            province = profile.Province,
            annualRevenue = profile.AnnualRevenue,
            hasConyuge = profile.HasConyuge,
            childrenCount = profile.ChildrenCount
        });
    }

    [HttpGet("vouchers/{taxId}")]
    public async Task<IActionResult> GetVouchers(string taxId)
    {
        _logger.LogInformation("Recuperando comprobantes para CUIT: {TaxId}", taxId);
        
        var vouchers = await _db.Vouchers
            .Where(v => v.UserCuit == taxId)
            .OrderByDescending(v => v.Date)
            .ToListAsync();

        return Ok(vouchers);
    }

    [HttpGet("alerts/{taxId}")]
    public async Task<IActionResult> GetAlerts(string taxId)
    {
        _logger.LogInformation("Recuperando alertas para CUIT: {TaxId}", taxId);
        
        var alerts = await _db.FiscalAlerts
            .Where(a => a.UserCuit == taxId)
            .ToListAsync();

        return Ok(alerts);
    }
}
