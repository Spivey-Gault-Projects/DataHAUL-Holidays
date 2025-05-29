using DataHaul.Holidays.Api.Models;

namespace DataHaul.Holidays.Api.Services
{
	public interface INagerDateService
	{
		Task<IEnumerable<Holiday>> GetPublicHolidaysAsync(int year, string countryCode);
	}
}
