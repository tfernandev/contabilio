using System;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class ContabilioDbContext : DbContext
{
    public ContabilioDbContext(DbContextOptions<ContabilioDbContext> options)
        : base(options)
    {
    }

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Voucher> Vouchers { get; set; }
    public DbSet<FiscalAlert> FiscalAlerts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data for local dev
        modelBuilder.Entity<UserProfile>().HasData(
            new UserProfile 
            { 
                Cuit = "20-12345678-9", 
                FullName = "PEREZ, JUAN BAUTISTA (DB)", 
                AnnualRevenue = 48500000, 
                Province = "CABA", 
                Regime = "monotributo", 
                HasConyuge = true, 
                ChildrenCount = 2, 
                Email = "juan.perez@example.com" 
            }
        );

        modelBuilder.Entity<Voucher>().HasData(
            new Voucher { Id = 1, UserCuit = "20-12345678-9", Date = new DateTime(2025, 11, 10), Type = "Factura C", Amount = 850000 },
            new Voucher { Id = 2, UserCuit = "20-12345678-9", Date = new DateTime(2025, 11, 15), Type = "Factura C", Amount = 1200000 },
            new Voucher { Id = 3, UserCuit = "20-12345678-9", Date = new DateTime(2025, 12, 1), Type = "Factura C", Amount = 950000 }
        );

        modelBuilder.Entity<FiscalAlert>().HasData(
            new FiscalAlert { Id = 1, UserCuit = "20-12345678-9", Type = "critical", Message = "Pendiente: Carga de deducciones SIRADIG F.572 (Desde DB SQlite)" },
            new FiscalAlert { Id = 2, UserCuit = "20-12345678-9", Type = "info", Message = "Próximo vencimiento Monotributo: 20 de de este mes." }
        );
    }
}
