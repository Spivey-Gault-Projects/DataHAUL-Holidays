using DataHaul.Holidays.Api.Data;
using DataHaul.Holidays.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 0. Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy
        .WithOrigins("http://localhost:3000")   // React dev server
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// 1. Database Context
builder.Services.AddDbContext<HolidayContext>(opts =>
  opts.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. HTTP Client for Nager.Date
builder.Services.AddHttpClient<INagerDateService, NagerDateService>(client =>
{
    client.BaseAddress = new Uri("https://date.nager.at/api/v3/");
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// 3. Controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactDev");


app.UseAuthorization();
app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};


app.Run();
