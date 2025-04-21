using System;
using Application.DTOs;
using Domain;
using Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public class Commands : IRequest<Result<Unit>> {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Commands, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Commands request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(x => x.Attendees)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            
            if(activity == null)
                return Result<Unit>.Failure("Activity not found", 404);
            
            var user = await userAccessor.GetUserAsync();

            var attendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);

            if(attendance != null) {
                if(attendance.IsHost) activity.IsCancelled = !activity.IsCancelled;
                else activity.Attendees.Remove(attendance);
            } else 
                activity.Attendees.Add(new ActivityAttendee
                {
                    ActivityId = activity.Id,
                    UserId = user.Id,
                    IsHost = false
                });

            var res = await context.SaveChangesAsync() > 0;
            if(!res)
                return Result<Unit>.Failure("Problems happened while updating DB", 400);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
