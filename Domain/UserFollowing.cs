using System;

namespace Domain;

public class UserFollowing
{
    public required string ObserverId { get; set; }
    public User Observer { get; set; } = null!; //follower
    public required string TargetId { get; set; }
    public User Target { get; set; } = null!; //followee
}
