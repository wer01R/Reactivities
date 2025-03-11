using System;
using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest {
        public required Activity Activity;
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command> {
        public async Task Handle(Command request, CancellationToken cancellationToken) {

            var activity = await context.Activities
                .FindAsync([request.Activity.Id], cancellationToken) 
                    ?? throw new Exception("Can't find activity");
            
            mapper.Map(request.Activity, activity);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
