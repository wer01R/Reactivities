using Application.Core;
using Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class SetMainPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

            if(photo == null) return Result<Unit>.Failure("Photo not found", 400);
            
            user.ImageUrl = photo.Url;

            var res = await context.SaveChangesAsync(cancellationToken) > 0;
            return res 
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem hanppened while setting main photo", 400);
        }
    }
}
