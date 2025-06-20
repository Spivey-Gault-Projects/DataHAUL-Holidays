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

		public async Task<IEnumerable<LongWeekend>> GetLongWeekendAsync(int year, string countryCode)
		{
			var result = await _http.GetFromJsonAsync<List<LongWeekend>>($"LongWeekend/{year}/{countryCode}");
			return result ?? Enumerable.Empty<LongWeekend>();
		}

		public async Task<bool> IsTodayPublicHolidayAsync(string countryCode)
		{
			// Nager.Date returns 204 No Content when today is NOT a holiday
			var resp = await _http.GetAsync($"IsTodayPublicHoliday/{countryCode}");
			if (resp.StatusCode == System.Net.HttpStatusCode.NoContent)
			{
				return false;
			}
			resp.EnsureSuccessStatusCode();
			// Now read the true/false body
			var isHoliday = await resp.Content.ReadFromJsonAsync<bool>();
			return isHoliday;
		}
		public async Task<IEnumerable<Holiday>> GetNextPublicHolidaysWorldwideAsync()
		{
			var result = await _http.GetFromJsonAsync<List<Holiday>>("NextPublicHolidaysWorldwide");
			return result ?? Enumerable.Empty<Holiday>();
		}

		public async Task<IEnumerable<Holiday>> GetNextPublicHolidaysForCountryAsync(string countryCode)
		{
			// this will call https://date.nager.at/api/v3/NextPublicHolidays/{countryCode}
			var result = await _http.GetFromJsonAsync<List<Holiday>>($"NextPublicHolidays/{countryCode}");
			return result ?? Enumerable.Empty<Holiday>();
		}
	}
}
