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
     "DefaultConnection": "Server=localhost,1433;Database=HolidaysDb;User Id=sa;Password=Your_strong_Password1!;TrustServerCertificate=True;"
   }
   ```
3. Apply database migrations: dotnet ef database update
4. Running the API: dotnet run
5. The API will be available at http://localhost:5000

## TODOs & Future Improvements

- [ ] **Authentication/Authorization**
      Implement a JWT-based login flow using **Azure AD B2C** (or Azure AD)—very similar to what you might build with AWS Cognito:

  1. **Azure AD B2C Setup**

     - Create an **Azure AD B2C** tenant within the subscription.
     - Define _user flows_ (e.g. sign-up/sign-in, password reset).
     - Register two applications in the B2C tenant:
       - **Frontend SPA** (React) — grant it the **Implicit** or **Authorization Code** flow.
       - **Backend API** — expose an **API scope** (e.g. `https://<tenant>.onmicrosoft.com/holidays-api/access_as_user`).
     - In B2C, assign the API scope to the SPA application as an authorized scope.

  2. **Front-end (React) Integration**

     - Install **MSAL.js** (`@azure/msal-browser` + `@azure/msal-react`).
     - Configure an MSAL instance with the B2C `authority` (domain+policy), `clientId`, and `redirectUri`.
     - Wrap the app in `<MsalProvider>` and use `useMsal()`/`useIsAuthenticated()` to:
       1. Trigger the B2C hosted UI (`loginRedirect` or `loginPopup`).
       2. Acquire an **access token** for the API scope.
       3. Attach `Authorization: Bearer <access_token>` to every `/api/*` request (e.g. via an Axios interceptor).

  3. **Back-end (ASP NET Core) Integration**

     - Add NuGet packages:
       ```bash
       dotnet add package Microsoft.Identity.Web
       dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
       ```
     - In **Program.cs**:

       ```csharp
       using Microsoft.Identity.Web;
       using Microsoft.AspNetCore.Authentication.JwtBearer;

       var builder = WebApplication.CreateBuilder(args);

       // 1. Configure JWT Bearer to validate tokens from Azure AD B2C
       builder.Services
         .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
         .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAdB2C"));

       builder.Services.AddAuthorization();

       var app = builder.Build();

       app.UseAuthentication();
       app.UseAuthorization();

       app.MapControllers();

       app.Run();
       ```

     - Protect the endpoints:
       ```csharp
       [Authorize]               // Requires any valid B2C user
       [Authorize("access_as_user")] // Requires the specific API scope
       [ApiController]
       [Route("api/[controller]")]
       public class HolidaysController : ControllerBase { … }
       ```

  4. **Configuration**
     In `appsettings.json`, add:

     ```json
     "AzureAdB2C": {
       "Instance": "https://<tenant>.b2clogin.com",
       "Domain": "<tenant>.onmicrosoft.com",
       "ClientId": "<API-app-registration-ClientId>",
       "ClientSecret": "<secret-if-using-confidential-client-flow>",
       "SignUpSignInPolicyId": "B2C_1_SignUpSignIn",
       "Scopes": "https://<tenant>.onmicrosoft.com/holidays-api/access_as_user"
     }
     ```

  5. **Parallels to AWS Cognito**
     - **Cognito User Pool** ↔ **Azure AD B2C user flows** (hosted sign-in/sign-up UI)
     - **Cognito App Client + Identity Pool** ↔ **B2C App Registrations** for SPA & API
     - **AWS Amplify Auth** ↔ **MSAL.js** for acquiring & caching JWTs
     - **Cognito ID/Access Tokens** ↔ **B2C ID/Access Tokens** (JWTs with claims & scopes)

  Once implemented, users will log in via the B2C hosted UI (much like Cognito’s), receive a signed JWT, and every protected API call will validate that token—securing the holiday endpoints end-to-end.- [ ] **Implement caching**: Add response caching for frequently accessed endpoints

- [ ] **Enhanced error handling**
      Add a global exception-handling middleware (or use `UseExceptionHandler`) to catch all unhandled exceptions and return standardized [RFC7807 ProblemDetails](https://tools.ietf.org/html/rfc7807) responses. Use `ILogger` (or Serilog/Application Insights) to log full stack traces and contextual information. You can also:

  1. Define custom exception types (e.g. `HolidayNotFoundException`) and map them to specific HTTP status codes.
  2. Return friendly error messages to callers while still logging the details internally.

- [ ] **Testing**

  - **Unit tests**: Use xUnit (or NUnit) + Moq (or NSubstitute) to test `NagerDateService` and any business logic in isolation. Mock out the HTTP client and `HolidayContext`.
  - **Integration tests**: Leverage `WebApplicationFactory<TEntryPoint>` from `Microsoft.AspNetCore.Mvc.Testing` to spin up the API in-memory. Hit the controllers (e.g. `/api/holidays/…`) and assert on the HTTP responses and serialized payloads. Use an in-memory SQLite provider (or a Dockerized test SQL) for EF migrations.

- [ ] **Rate limiting**
      Protect the API from abusive clients by introducing a middleware such as [AspNetCoreRateLimit](https://github.com/stefanprodan/AspNetCoreRateLimit) or the new built-in rate limiter in .NET 8:
  ```csharp
  // In Program.cs
  builder.Services.AddRateLimiter(opts =>
    opts.AddFixedWindowLimiter("GlobalLimiter", options =>
    {
      options.PermitLimit = 100;
      options.Window = TimeSpan.FromMinutes(1);
      options.QueueLimit = 50;
      options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    })
  );
  app.UseRateLimiter();
  ```
- [ ] **Health checks**: Add `/health` endpoint for monitoring
      We expose a simple `/health` endpoint that verifies both:

1. **Database connectivity**

   - Install:
     ```bash
     dotnet add package AspNetCore.HealthChecks.SqlServer
     ```
   - In `Program.cs`, add:
     ```csharp
     builder.Services
       .AddHealthChecks()
       .AddSqlServer(
         builder.Configuration.GetConnectionString("DefaultConnection"),
         name: "sql-server",
         failureStatus: HealthStatus.Unhealthy,
         tags: new[] { "db" });
     ```

2. **External Nager.Date API availability**

   - Install:
     ```bash
     dotnet add package AspNetCore.HealthChecks.Uris
     ```
   - Register a named HTTP client and the custom check in `Program.cs`:
     ```csharp
     builder.Services.AddHttpClient("Health", c => {
       c.BaseAddress = new Uri("https://date.nager.at/api/v3/");
       c.Timeout     = TimeSpan.FromSeconds(5);
     });
     builder.Services
       .AddHealthChecks()
       .AddCheck<ExternalApiHealthCheck>(
         "nagerdate-api",
         failureStatus: HealthStatus.Degraded,
         tags: new[] { "api", "external" });
     ```
   - Create `ExternalApiHealthCheck` (implements `IHealthCheck`) that does a quick GET to `/IsTodayPublicHoliday/AX` and returns Healthy if it gets 204 or 200.

3. **Map the endpoint**

   - In `Program.cs` just before `app.Run()` add:
     ```csharp
     app.MapHealthChecks("/health", new HealthCheckOptions {
       ResponseWriter = async (ctx, report) => {
         ctx.Response.ContentType = "application/json";
         await ctx.Response.WriteAsJsonAsync(new {
           status = report.Status.ToString(),
           checks = report.Entries.Select(e => new {
             name   = e.Key,
             status = e.Value.Status.ToString(),
             error  = e.Value.Exception?.Message
           })
         });
       }
     });
     ```

4. **Try it**
   ```bash
   curl http://localhost:5000/health
   # -> { "status":"Healthy", "checks":[…] }
   ```
