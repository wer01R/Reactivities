using Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => 
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
                    ?? throw new InvalidOperationException("IMediator service is unavailable");

        protected IActionResult HandleRequest<T>(Result<T> result) {
            if(!result.IsSuccess && result.code == 404) return NotFound();

            if(result.IsSuccess && result.Value != null) return Ok(result.Value);
        
            return BadRequest(result.Error);
        }
    }
}
