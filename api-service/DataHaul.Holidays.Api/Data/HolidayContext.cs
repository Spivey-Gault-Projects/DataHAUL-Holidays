using DataHaul.Holidays.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DataHaul.Holidays.Api.Data
{
	public class HolidayContext : DbContext
	{
		public HolidayContext(DbContextOptions<HolidayContext> options)
			: base(options) { }

		public DbSet<Holiday> Holidays => Set<Holiday>();
	}
}
