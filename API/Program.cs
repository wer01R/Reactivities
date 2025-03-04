using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Migrations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try {
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
} catch (Exception err) {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(err, "An error occurred during migration!");
}

app.Run();
