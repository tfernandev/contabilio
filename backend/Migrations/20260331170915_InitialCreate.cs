using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Cuit = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", nullable: false),
                    Regime = table.Column<string>(type: "TEXT", nullable: false),
                    AnnualRevenue = table.Column<decimal>(type: "TEXT", nullable: false),
                    HasConyuge = table.Column<bool>(type: "INTEGER", nullable: false),
                    ChildrenCount = table.Column<int>(type: "INTEGER", nullable: false),
                    Province = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Cuit);
                });

            migrationBuilder.CreateTable(
                name: "FiscalAlerts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Message = table.Column<string>(type: "TEXT", nullable: false),
                    UserCuit = table.Column<string>(type: "TEXT", nullable: false),
                    UserProfileCuit = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FiscalAlerts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FiscalAlerts_UserProfiles_UserProfileCuit",
                        column: x => x.UserProfileCuit,
                        principalTable: "UserProfiles",
                        principalColumn: "Cuit");
                });

            migrationBuilder.CreateTable(
                name: "Vouchers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Amount = table.Column<decimal>(type: "TEXT", nullable: false),
                    UserCuit = table.Column<string>(type: "TEXT", nullable: false),
                    UserProfileCuit = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vouchers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vouchers_UserProfiles_UserProfileCuit",
                        column: x => x.UserProfileCuit,
                        principalTable: "UserProfiles",
                        principalColumn: "Cuit");
                });

            migrationBuilder.InsertData(
                table: "FiscalAlerts",
                columns: new[] { "Id", "Message", "Type", "UserCuit", "UserProfileCuit" },
                values: new object[,]
                {
                    { 1, "Pendiente: Carga de deducciones SIRADIG F.572 (Desde DB SQlite)", "critical", "20-12345678-9", null },
                    { 2, "Próximo vencimiento Monotributo: 20 de de este mes.", "info", "20-12345678-9", null }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Cuit", "AnnualRevenue", "ChildrenCount", "Email", "FullName", "HasConyuge", "Province", "Regime" },
                values: new object[] { "20-12345678-9", 48500000m, 2, "juan.perez@example.com", "PEREZ, JUAN BAUTISTA (DB)", true, "CABA", "monotributo" });

            migrationBuilder.InsertData(
                table: "Vouchers",
                columns: new[] { "Id", "Amount", "Date", "Type", "UserCuit", "UserProfileCuit" },
                values: new object[,]
                {
                    { 1, 850000m, new DateTime(2025, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Factura C", "20-12345678-9", null },
                    { 2, 1200000m, new DateTime(2025, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Factura C", "20-12345678-9", null },
                    { 3, 950000m, new DateTime(2025, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Factura C", "20-12345678-9", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_FiscalAlerts_UserProfileCuit",
                table: "FiscalAlerts",
                column: "UserProfileCuit");

            migrationBuilder.CreateIndex(
                name: "IX_Vouchers_UserProfileCuit",
                table: "Vouchers",
                column: "UserProfileCuit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FiscalAlerts");

            migrationBuilder.DropTable(
                name: "Vouchers");

            migrationBuilder.DropTable(
                name: "UserProfiles");
        }
    }
}
