using Application.Activities.Commands;
using Application.Activities.DTOs;

namespace Application.Validators;

public class CreateActivityValidator 
    : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{  
    public CreateActivityValidator() : base(x => x.ActivityDto)
    {

    }
}
