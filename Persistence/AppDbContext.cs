using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions opt) : DbContext(opt)
{
    public required DbSet<Activity> Activities { get; set; }
}
