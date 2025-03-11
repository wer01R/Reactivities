using API.Controllers;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Migrations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddMediatR(x => 
    x.RegisterServicesFromAssemblyContaining<CreateActivity.Handler>());
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

//Build 
var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));

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
