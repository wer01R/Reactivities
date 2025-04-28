using Application.Core;
using Application.Interfaces;
using Domain;
using Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public required IFormFile File { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context, 
        IPhotoService photoService) : IRequestHandler<Command, Result<Photo>>
    {
        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.UploadPhoto(request.File); 

            if(uploadResult == null) return Result<Photo>.Failure("Failed to update photo", 400);

            var user = await userAccessor.GetUserAsync();

            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.Id,
                UserId = user.Id
            };

            user.ImageUrl ??= photo.Url;

            context.Photos.Add(photo);
            var res = await context.SaveChangesAsync(cancellationToken) > 0;

            if(!res) return Result<Photo>.Failure("Problem hanppened while saving photo to DB", 400);
            return Result<Photo>.Success(photo);
        }
    }
}
