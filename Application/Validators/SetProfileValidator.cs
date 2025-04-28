using Application.Profiles.Commands;
using FluentValidation;

namespace Application.Validators;

public class SetProfileValidator : AbstractValidator<SetProfile.Command>
{
    public SetProfileValidator()
    {
        RuleFor(profile => profile.User.DisplayName)
            .NotEmpty().WithMessage("name can't be empty");
    }
}
