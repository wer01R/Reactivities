using Application.Activities.Commands;
using Application.Activities.Queries;
using Application.DTOs;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities() {
        return await Mediator.Send(new GetActivityList.Query());
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
        return HandleRequest(await Mediator.Send(new EditActivity.Command {ActivityDto = activityDto}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(string id) {
        return HandleRequest(await Mediator.Send(new DeleteActivity.Command {Id = id}));
    }
}
