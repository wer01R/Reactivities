using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class AddComment
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public required string Body { get; set; }
        public required string ActivityId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<CommentDto>>
    {
        public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(x => x.Comments)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

            if(activity == null) return Result<CommentDto>.Failure("Activity not found", 400);

            var user = await userAccessor.GetUserAsync();

            var comment = new Comment
            {
                UserId = user.Id,
                Body = request.Body,
                ActivityId = activity.Id
            };

            activity.Comments.Add(comment);

            bool res = await context.SaveChangesAsync(cancellationToken) > 0;
            if(!res) return Result<CommentDto>.Failure("Failed to add comment", 400);
            return Result<CommentDto>.Success(mapper.Map<Comment, CommentDto>(comment));
        }
    }
}
