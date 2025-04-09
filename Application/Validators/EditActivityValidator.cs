using System;
using System.Security.Cryptography.X509Certificates;
using Application.Activities.Commands;
using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class EditActivityValidator 
    : BaseActivityValidator<EditActivity.Command, EditActivityDto>
{
    public EditActivityValidator() : base(x => x.ActivityDto)
    {
        RuleFor(x => x.ActivityDto.Id)
            .NotEmpty().WithMessage(isRequired("Id"));
    }
}
