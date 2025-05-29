using System.ComponentModel.DataAnnotations.Schema;

namespace DataHaul.Holidays.Api.Models
{
	public class Holiday
	{
		public int Id { get; set; }
		public string LocalName { get; set; } = null!;
		public string Name { get; set; } = null!;
		public DateTime Date { get; set; }
		public string CountryCode { get; set; } = null!;
		public bool Fixed { get; set; }
		public bool Global { get; set; }
		public int? LaunchYear { get; set; }

		[NotMapped]
		public List<string>? Counties { get; set; }

		[NotMapped]
		public List<string> Types { get; set; } = new();
	}
}
