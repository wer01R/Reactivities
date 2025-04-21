using System;
using System.Security.Claims;
using Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement
{
}

public class IsHostRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) 
    : AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if(userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;
        var activityId = "";

        if(httpContext?.Items["EditActivityDto"] is EditActivityDto activity) {
            activityId = activity.Id;
        } else if (httpContext?.GetRouteValue("id") is string id) {
            activityId = id;
        }
        if(activityId == "") return;


        var attendee = await dbContext.ActivityAttendees
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.ActivityId == activityId && x.UserId == userId);
        
        if(attendee == null || !attendee.IsHost) return;

        context.Succeed(requirement);
    }
}
