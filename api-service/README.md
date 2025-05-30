# DataHaul Holidays API Service

The API service component for the DataHaul Holidays application, providing holiday data from the Nager.Date API with persistence capabilities.

## Overview

This ASP.NET Core 8 Web API serves as the backend for the DataHaul Holidays application. It provides endpoints to:

- Retrieve public holidays by country and year
- Check if today is a public holiday in a given country
- Get upcoming public holidays worldwide and by country
- Fetch available countries and long weekend information

The service integrates with the [Nager.Date Public Holiday API](https://date.nager.at/Api) and persists holiday data to a SQL database using Entity Framework.

## Key Components

### Services

- **NagerDateService**: Implements `INagerDateService` to interact with the Nager.Date API
  - Methods for all required holiday data operations
  - Handles HTTP requests and responses
  - Implements error handling for API responses

### Controllers

- **CountriesController**: `/api/countries`
  - `GET`: Returns list of available countries
- **HolidaysController**: `/api/holidays`
  - `GET /{year}/{countryCode}`: Returns holidays for specific year/country
  - `GET /is-today/{countryCode}`: Checks if today is a holiday
  - `GET /nextholidays`: Returns next holidays worldwide
  - `GET /next365/{countryCode}`: Returns next holidays for country
- **LongWeekendsController**: `/api/longweekends`
  - `GET /{year}/{countryCode}`: Returns long weekends

### Data

- **HolidayContext**: Entity Framework DbContext for holiday data
  - Manages database connections
  - Provides access to `Holidays` DbSet

### Models

- **Holiday**: Represents a public holiday with all properties from Nager.Date
- **Country**: Country information with code and name
- **LongWeekend**: Represents a long weekend period

## Setup Instructions

### Prerequisites

- .NET 8 SDK
- SQL Server (or compatible database)
- Azure Core Tools CLI (for Function App development)

### Configuration

1. Clone the repository
2. Set up database connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=your_server;Database=HolidaysDb;User Id=your_user;Password=your_password;"
   }
   ```
3. Apply database migrations: dotnet ef database update
4. Running the API: dotnet run
5. The API will be available at http://localhost:5000

## TODOs & Future Improvements

### Add authentication/authorization

### Implement caching for API responses

### Add more comprehensive error handling

### Write unit and integration tests

### Implement rate limiting

### Add health check endpoints
