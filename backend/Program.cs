using backend.Data;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddScoped<IOcrService, OcrService>();

// Database Configuration
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
if (!string.IsNullOrEmpty(connectionString))
{
    // Render provides DATABASE_URL in a specific format, but Npgsql.EntityFrameworkCore.PostgreSQL 
    // usually handles it or can be converted.
    builder.Services.AddDbContext<ContabilioDbContext>(options =>
        options.UseNpgsql(connectionString));
}
else
{
    // Fallback to SQLite for local development
    builder.Services.AddDbContext<ContabilioDbContext>(options =>
        options.UseSqlite("Data Source=contabilio.db"));
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVite",
        policy =>
        {
            policy.AllowAnyOrigin() // Relaxed for production deployment
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configure Port for Render
var port = Environment.GetEnvironmentVariable("PORT") ?? "5154";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowVite");
app.MapControllers();

app.Run();
