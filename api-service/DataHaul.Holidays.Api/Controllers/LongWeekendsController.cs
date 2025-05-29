using DataHaul.Holidays.Api.Models;
using DataHaul.Holidays.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DataHaul.Holidays.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class LongWeekendsController : ControllerBase
	{
		private readonly INagerDateService _nager;
		public LongWeekendsController(INagerDateService nager) => _nager = nager;

		[HttpGet("{year:int}/{countryCode}")]
		public async Task<IEnumerable<Holiday>> Get(int year, string countryCode) =>
			await _nager.GetLongWeekendAsync(year, countryCode.ToUpper());
	}
}
