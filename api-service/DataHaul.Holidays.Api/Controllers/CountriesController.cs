using DataHaul.Holidays.Api.Models;
using DataHaul.Holidays.Api.Services;
using Microsoft.AspNetCore.Mvc;


/**
 * CountriesController.cs
 *
 * This controller provides an endpoint to retrieve a list of available countries
 * for which public holidays can be queried.
 */
namespace DataHaul.Holidays.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CountriesController : ControllerBase
	{
		private readonly INagerDateService _nager;
		public CountriesController(INagerDateService nager) => _nager = nager;

		[HttpGet]
		public async Task<IEnumerable<Country>> Get() =>
			await _nager.GetAvailableCountriesAsync();
	}
}
