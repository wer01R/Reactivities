using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<string> {
        public required Activity Activity {get; set;}
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, String>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            if(request.Activity.Id.Length == 0) throw new Exception("Activity id not supported");

            context.Activities.Add(request.Activity);

            await context.SaveChangesAsync(cancellationToken);
            return request.Activity.Id;
        }
    }
}
