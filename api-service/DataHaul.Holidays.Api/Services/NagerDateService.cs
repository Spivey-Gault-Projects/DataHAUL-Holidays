using DataHaul.Holidays.Api.Models;
using System.Net.Http.Json;

namespace DataHaul.Holidays.Api.Services
{
	public class NagerDateService : INagerDateService
	{
		private readonly HttpClient _http;

		public NagerDateService(HttpClient http)
		{
			_http = http;
		}

		public async Task<IEnumerable<Holiday>> GetPublicHolidaysAsync(int year, string countryCode)
		{
			// e.g. GET publicholidays/2025/US
			var path = $"publicholidays/{year}/{countryCode}";
			var result = await _http.GetFromJsonAsync<List<Holiday>>(path);
			return result ?? Enumerable.Empty<Holiday>();
		}
	}
}
