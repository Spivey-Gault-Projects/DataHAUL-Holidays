using DataHaul.Holidays.Api.Data;
using DataHaul.Holidays.Api.Models;
using DataHaul.Holidays.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DataHaul.Holidays.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class HolidaysController : ControllerBase
	{
		private readonly INagerDateService _nager;
		private readonly HolidayContext _db;

		public HolidaysController(INagerDateService nager, HolidayContext db)
		{
			_nager = nager;
			_db = db;
		}
		[HttpGet("nextholidays")]
		public async Task<ActionResult<IEnumerable<Holiday>>> GetNextWorldwide()
		{
			var result = await _nager.GetNextPublicHolidaysWorldwideAsync();
			return Ok(result);
		}
		[HttpGet("is-today/{countryCode}")]
		public async Task<ActionResult<bool>> IsToday(string countryCode)
		{
			var result = await _nager.IsTodayPublicHolidayAsync(countryCode.ToUpper());
			return Ok(result);
		}

		[HttpGet("{year:int}/{countryCode}")]
		public async Task<ActionResult<IEnumerable<Holiday>>> Get(int year, string countryCode)
		{
			// 1. Fetch from remote
			var remote = await _nager.GetPublicHolidaysAsync(year, countryCode.ToUpper());

			// 2. Persist to DB (upsert)
			foreach (var h in remote)
			{
				// if exists by Date+CountryCode, skip or update
				var exists = await _db.Holidays
					.AnyAsync(x => x.Date == h.Date && x.CountryCode == h.CountryCode);
				if (!exists)
					_db.Holidays.Add(h);
			}
			await _db.SaveChangesAsync();

			// 3. Return full list (could return `remote` directly)
			return Ok(remote);
		}
	}
}
