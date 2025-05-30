using DataHaul.Holidays.Api.Models;


namespace DataHaul.Holidays.Api.Services
{
	/**
	* Interface for the Nager Date Service.
	* This service provides methods to interact with public holiday data, including fetching holidays,
	* available countries, long weekends, and checking if today is a public holiday.
	* It is designed to be used by controllers to access holiday-related information.
*/
	public interface INagerDateService
	{
		Task<IEnumerable<Holiday>> GetPublicHolidaysAsync(int year, string countryCode);
		Task<IEnumerable<Country>> GetAvailableCountriesAsync();
		Task<IEnumerable<LongWeekend>> GetLongWeekendAsync(int year, string countryCode);
		Task<bool> IsTodayPublicHolidayAsync(string countryCode);
		Task<IEnumerable<Holiday>> GetNextPublicHolidaysWorldwideAsync();
		Task<IEnumerable<Holiday>> GetNextPublicHolidaysForCountryAsync(string countryCode);

	}
}