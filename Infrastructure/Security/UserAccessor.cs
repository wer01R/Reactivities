using System.Security.Claims;
using Domain;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext context) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {   
        return await context.Users.FindAsync(GetUserId())
            ?? throw new UnauthorizedAccessException("No user is logged in");
    }

    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("No user found");
    }

    public async Task<User> GetUserWithPhotosAsync()
    {
        return await context.Users
            .Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.Id == GetUserId())
                ?? throw new UnauthorizedAccessException("No user is logged in");
    }
}
