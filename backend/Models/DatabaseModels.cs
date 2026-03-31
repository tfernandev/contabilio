using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class UserProfile
{
    [Key]
    public string Cuit { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Regime { get; set; } = "monotributo";
    public decimal AnnualRevenue { get; set; }
    public bool HasConyuge { get; set; }
    public int ChildrenCount { get; set; }
    public string Province { get; set; } = "CABA";
    
    // Lazy relationships
    public List<Voucher> Vouchers { get; set; } = new();
    public List<FiscalAlert> Alerts { get; set; } = new();
}

public class Voucher
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Type { get; set; } = "Factura C";
    public decimal Amount { get; set; }
    public string UserCuit { get; set; } = string.Empty;
}

public class FiscalAlert
{
    public int Id { get; set; }
    public string Type { get; set; } = "info"; // critical, warning, info
    public string Message { get; set; } = string.Empty;
    public string UserCuit { get; set; } = string.Empty;
}
