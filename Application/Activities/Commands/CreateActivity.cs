using System;
using Application.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>> {
        public required CreateActivityDto ActivityDto {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper, IValidator<Command> validator) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            // await validator.ValidateAndThrowAsync(request, cancellationToken);

            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(activity);

            var res = await context.SaveChangesAsync(cancellationToken) > 0;
            if(!res) return Result<string>.Failure("Failed to delete the activity", 400);

            return Result<string>.Success(activity.Id);
        }
    }
}
