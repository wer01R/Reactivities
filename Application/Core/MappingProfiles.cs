using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles() {

        string? currentUserId = null;
        
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();

        CreateMap<Activity, ActivityDto>()
            .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => 
                s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(d => d.HostId, o => o.MapFrom(s => 
                s.Attendees.FirstOrDefault(x => x.IsHost)!.UserId));
                
        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(x => x.User.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(x => x.User.Bio))
            .ForMember(d => d.Id, o => o.MapFrom(x => x.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(x => x.User.ImageUrl))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(x => x.User.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(x => x.User.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(x => 
                x.User.Followers.Any(s => s.ObserverId == currentUserId)));
        
        CreateMap<User, UserProfile>()
            .ForMember(d => d.FollowersCount, o => o.MapFrom(x => x.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(x => x.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(x => 
                x.Followers.Any(s => s.ObserverId == currentUserId)));

        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(x => x.User.DisplayName))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(x => x.User.ImageUrl));
    }
}
