using System;
using System.Reflection.Metadata.Ecma335;

namespace Application.Profiles.DTOs;

public class UserProfile
{
    public required string Id { get; set; }
    public required string Displayname { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
}
