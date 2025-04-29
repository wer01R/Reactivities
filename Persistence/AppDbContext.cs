using System.Net.Http.Headers;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions opt) : IdentityDbContext<User>(opt)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<UserFollowing> UserFollowings { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(x => x.HasKey(a => new {a.ActivityId, a.UserId}));

        builder.Entity<ActivityAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Activities)
            .HasForeignKey(x => x.UserId);

        builder.Entity<ActivityAttendee>()
            .HasOne(x => x.Activity)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.ActivityId);

        builder.Entity<UserFollowing>(x => {
            x.HasKey(u => new {u.ObserverId, u.TargetId});

            x.HasOne(o => o.Observer)
            .WithMany(f => f.Followings)
            .HasForeignKey(o => o.ObserverId);

            x.HasOne(t => t.Target)
            .WithMany(f => f.Followers)
            .HasForeignKey(t => t.TargetId);
        });
        
        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach(var entityType in builder.Model.GetEntityTypes()) {
            foreach(var property in entityType.GetProperties()) {
                if(property.ClrType == typeof(DateTime)) {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}
