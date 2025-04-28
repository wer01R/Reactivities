using Application.Core;
using Application.Profiles.DTOs;
using Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class SetProfile
{   
    public class Command : IRequest<Result<Unit>>
    {
        public required UpdateUserDto User { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            
            if(user == null) 
                return Result<Unit>.Failure("user not found", 400);
            
            user.Bio = request.User.Bio;
            user.DisplayName = request.User.DisplayName;

            bool res = await context.SaveChangesAsync() > 0;
            if(!res) return Result<Unit>.Failure("Problem happened while saving data", 400);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
