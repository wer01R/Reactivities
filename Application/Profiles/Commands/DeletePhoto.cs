using Application.Core;
using Application.Interfaces;
using Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context, 
        IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

            if(photo == null) return Result<Unit>.Failure("Photo not found", 400);
            if(photo.Url == user.ImageUrl)
                return Result<Unit>.Failure("Cannot delete main photo", 400);
            
            await photoService.DeletePhoto(photo.PublicId);

            user.Photos.Remove(photo);

            var res = await context.SaveChangesAsync(cancellationToken) > 0;
            return res 
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem hanppened while deleting photo", 400);
        }
    }
}
