using System;
using Application.Profiles.Commands;
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

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetProfile(string userId) 
    {
        return HandleRequest(await Mediator.Send(new GetProfile.Query {UserId = userId}));
    }
}
