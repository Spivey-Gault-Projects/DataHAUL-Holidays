using DataHaul.Holidays.Api.Models;
using DataHaul.Holidays.Api.Services;
using Microsoft.AspNetCore.Mvc;


/**
* LongWeekendsController.cs
* This controller provides an endpoint to retrieve long weekends for a given year and country code.
* Long weekends are defined as public holidays that create a weekend of at least three days.
*/
namespace DataHaul.Holidays.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class LongWeekendsController : ControllerBase
	{
		private readonly INagerDateService _nager;
		public LongWeekendsController(INagerDateService nager) => _nager = nager;

		[HttpGet("{year:int}/{countryCode}")]
		public async Task<ActionResult<IEnumerable<LongWeekend>>> Get(int year, string countryCode)
		{
			var list = await _nager.GetLongWeekendAsync(year, countryCode.ToUpper());
			return Ok(list);
		}
	}
}
