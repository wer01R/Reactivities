using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Persistence;

namespace Application.Profiles.Queries;

public class GetFollowings
{   
    public class Query : IRequest<Result<List<UserProfile>>>
    {
        public string Predicate { get; set; } = "followers";
        public required string UserId { get; set; }
    }

    public class Hanlder(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<UserProfile>>>
    {
        public async Task<Result<List<UserProfile>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profiles = new List<UserProfile>();

            if(request.Predicate == "followers")
            {
                profiles = await context.UserFollowings
                    .Where(x => request.UserId == x.TargetId)
                    .Select(x => x.Observer)
                    .ProjectTo<UserProfile>(mapper.ConfigurationProvider, 
                        new {currentUserId = userAccessor.GetUserId()})
                    .ToListAsync(cancellationToken);
            } 

            else 
            {
                profiles = await context.UserFollowings
                    .Where(x => request.UserId == x.ObserverId)
                    .Select(x => x.Target)
                    .ProjectTo<UserProfile>(mapper.ConfigurationProvider,
                        new {currentUserId = userAccessor.GetUserId()})
                    .ToListAsync(cancellationToken);
            }

            return Result<List<UserProfile>>.Success(profiles);
        }
    }
}
