using Application.Activities.Queries;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required ActivityParams Params { get; set; }
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Activities
                .Where(x => x.Attendees.Any(a => a.UserId == request.UserId));


            if(!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "past" => query.Where(x => x.Date < DateTime.UtcNow),
                    "future" => query.Where(x => x.Date >= DateTime.UtcNow),
                    "hosting" => query.Where(x => 
                        x.Attendees.Any(a => a.UserId == request.UserId && a.IsHost)),
                    _ => query
                };
            }

            var activities = await query
                .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            
            return Result<List<UserActivityDto>>.Success(activities);
        }
    }
}
