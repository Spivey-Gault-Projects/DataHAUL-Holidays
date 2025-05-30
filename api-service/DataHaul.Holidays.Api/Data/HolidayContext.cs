using DataHaul.Holidays.Api.Models;
using Microsoft.EntityFrameworkCore;

/**
 * Data context for the Holiday API.
 * This class is responsible for managing the database connection and providing access to the Holiday entities.
 */
namespace DataHaul.Holidays.Api.Data
{
	public class HolidayContext : DbContext
	{
		public HolidayContext(DbContextOptions<HolidayContext> options)
			: base(options) { }

		public DbSet<Holiday> Holidays => Set<Holiday>();
	}
}
