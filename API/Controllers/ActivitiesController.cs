using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetActivities(
        [FromQuery]ActivityParams activityParams) {
        return HandleRequest(await Mediator.Send(new GetActivityList.Query {Params = activityParams}));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivitiesById(string id) {
        return HandleRequest(await Mediator.Send(new GetActivityDetails.Query{Id = id}));
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(CreateActivityDto activity) {
        return HandleRequest(await Mediator.Send(new CreateActivity.Command {ActivityDto = activity}));
    }

    [HttpPut]
    public async Task<IActionResult> EditActivity(EditActivityDto activityDto) {
        HttpContext.Items["EditActivityDto"] = activityDto;

        var result = await HttpContext.RequestServices
            .GetService<IAuthorizationService>()!.AuthorizeAsync(User, null, new IsHostRequirement());
        if(!result.Succeeded) return Forbid();

        return HandleRequest(await Mediator.Send(new EditActivity.Command {ActivityDto = activityDto}));
    }

    [HttpDelete("{id}")]
    [Authorize("IsActivityHost")]
    public async Task<IActionResult> DeleteActivity(string id) {
        return HandleRequest(await Mediator.Send(new DeleteActivity.Command {Id = id}));
    }

    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(string id) {
        return HandleRequest(await Mediator.Send(new UpdateAttendance.Commands {Id = id}));
    }
}
