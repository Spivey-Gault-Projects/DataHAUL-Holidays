using DataHaul.Holidays.Api.Models;
using DataHaul.Holidays.Api.Services;
using Microsoft.AspNetCore.Mvc;


/**
* NextHolidaysController.cs
* This controller provides an endpoint to retrieve the next public holidays worldwide.
* It uses the INagerDateService to fetch the data.
*/
namespace DataHaul.Holidays.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class NextHolidaysController : ControllerBase
	{
		private readonly INagerDateService _nager;
		public NextHolidaysController(INagerDateService nager) => _nager = nager;

		// GET api/nextholidays
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Holiday>>> Get()
		{
			var list = await _nager.GetNextPublicHolidaysWorldwideAsync();
			return Ok(list);
		}
	}
}
