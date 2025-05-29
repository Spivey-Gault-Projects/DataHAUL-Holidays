using DataHaul.Holidays.Api.Models;
using System.Net.Http.Json;

namespace DataHaul.Holidays.Api.Services
{
	public class NagerDateService : INagerDateService
	{
		private readonly HttpClient _http;
		public NagerDateService(HttpClient http) => _http = http;

		public async Task<IEnumerable<Holiday>> GetPublicHolidaysAsync(int year, string countryCode)
		{
			var result = await _http.GetFromJsonAsync<List<Holiday>>($"publicholidays/{year}/{countryCode}");
			return result ?? Enumerable.Empty<Holiday>();
		}

		public async Task<IEnumerable<Country>> GetAvailableCountriesAsync()
		{
			var result = await _http.GetFromJsonAsync<List<Country>>("AvailableCountries");
			return result ?? Enumerable.Empty<Country>();
		}

		public async Task<IEnumerable<Holiday>> GetLongWeekendAsync(int year, string countryCode)
		{
			var result = await _http.GetFromJsonAsync<List<Holiday>>($"LongWeekend/{year}/{countryCode}");
			return result ?? Enumerable.Empty<Holiday>();
		}

		public async Task<bool> IsTodayPublicHolidayAsync(string countryCode)
		{
			var result = await _http.GetFromJsonAsync<bool>($"IsTodayPublicHoliday/{countryCode}");
			return result;
		}
	}
}
