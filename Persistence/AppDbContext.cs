using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions opt) : IdentityDbContext<User>(opt)
{
    public required DbSet<Activity> Activities { get; set; }
}
