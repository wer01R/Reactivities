using System;
using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class BaseActivityValidator<T, TDto> 
    : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector) {
        RuleFor(x => selector(x).Title)
            .NotEmpty().WithMessage(isRequired("Title"))
            .MaximumLength(100).WithMessage("Title must not exceed 100 characters");
        RuleFor(x => selector(x).Description)
            .NotEmpty().WithMessage(isRequired("Description"));
        RuleFor(x => selector(x).Date)
            .GreaterThan(DateTime.Now).WithMessage("Date must be in the future");
        RuleFor(x => selector(x).Category)
            .NotEmpty().WithMessage(isRequired("Category"));
        RuleFor(x => selector(x).City)
            .NotEmpty().WithMessage(isRequired("City"));
        RuleFor(x => selector(x).Venue)
            .NotEmpty().WithName(isRequired("Venue"));
        RuleFor(x => selector(x).Latitude)
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90")
            .NotEmpty().WithName(isRequired("Latitude"));
        RuleFor(x => selector(x).Longitude)
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 ans 180")
            .NotEmpty().WithName(isRequired("Longitude"));
    }
    protected string isRequired(string s) {
        return s + " is required!";
    }
}