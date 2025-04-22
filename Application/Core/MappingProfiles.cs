using Application.Activities.Commands;
using Application.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles() {
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
            .ForMember(d => d.ImageUrl, o => o.MapFrom(x => x.User.ImageUrl));
    }
}
