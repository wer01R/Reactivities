using System;

namespace Application.Profiles.DTOs;

public class UpdateUserDto
{
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
}
