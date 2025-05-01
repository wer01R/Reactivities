using System;
using Application.Activities.Queries;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Microsoft.AspNetCore.DataProtection.Internal;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpPost("add-photo")]
    public async Task<IActionResult> AddPhoto(IFormFile file)
    {
        return HandleRequest(await Mediator.Send(new AddPhoto.Command {File = file}));
    }

    [HttpGet("{userId}/photos")]
    public async Task<IActionResult> GetUserPhotos(string userId) 
    {
        return HandleRequest(await Mediator.Send(new GetProfilePhotos.Query {UserId = userId}));
    }

    [HttpDelete("{photoId}/photos")]
    public async Task<IActionResult> DeletePhoto(string photoId) 
    {
        return HandleRequest(await Mediator.Send(new DeletePhoto.Command {PhotoId = photoId}));
    }

    [HttpPut("{photoId}/setMain")]
    public async Task<IActionResult> SetMainPhoto(string photoId)
    {
        return HandleRequest(await Mediator.Send(new SetMainPhoto.Command {PhotoId = photoId}));
    }

    [HttpPut]
    public async Task<IActionResult> SetProfile(UpdateUserDto user)
    {
        return HandleRequest(await Mediator.Send(new SetProfile.Command {User = user}));
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetProfile(string userId) 
    {
        return HandleRequest(await Mediator.Send(new GetProfile.Query {UserId = userId}));
    }

    [HttpPost("{userId}/follow")]
    public async Task<IActionResult> FollowToggle(string userId)
    {
        return HandleRequest(await Mediator.Send(new FollowToggle.Command {TargetUserId = userId}));
    }

    [HttpGet("{userId}/follow-list")]
    public async Task<IActionResult> GetFollowings(string userId, string predicate)
    {
        return HandleRequest(await Mediator.Send(new GetFollowings.Query {UserId = userId, Predicate = predicate}));
    }

    [HttpGet("{userId}/activities")]
    public async Task<IActionResult> GetActivities(string userId, 
        [FromQuery]ActivityParams activityParams)
    {
        return HandleRequest(await Mediator.Send(new GetUserActivities.Query {UserId = userId, Params = activityParams}));
    }

}
