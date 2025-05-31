# function-service

A simple Python Azure Functions app that proxies the [Nager.Date Holiday API](https://date.nager.at/Api) for:

- **Public holidays** by year & country
- **Long weekends** by year & country
- **“Is today a public holiday?”** by country

To create and activate the virtual environment:

- python -m venv .venv
- source .venv/bin/activate (for macOS)

Install dependencies:

- pip install -r requirements.txt

Run locally and start the functions runtime:

- func start

- Routes should be listed after starting:
  Functions:
  HolidaysFunction: GET http://localhost:7071/api/Holidays/{year}/{country}
  LongWeekendsFunction: GET http://localhost:7071/api/LongWeekend/{year}/{country}
  IsTodayFunction: GET http://localhost:7071/api/IsTodayPublicHoliday/{country}

Test with curl:

```bash
curl http://localhost:7071/api/Holidays/2025/US
curl http://localhost:7071/api/LongWeekend/2025/US
curl http://localhost:7071/api/IsTodayPublicHoliday/US
curl http://localhost:7071/api/NextPublicHolidaysWorldwide
curl http://localhost:7071/api/NextPublicHolidays/CA


```

Endpoints:

HolidaysFunction: GET http://localhost:7071/api/Holidays/{year}/{country}
LongWeekendsFunction: GET http://localhost:7071/api/LongWeekend/{year}/{country}
IsTodayFunction: GET http://localhost:7071/api/IsTodayPublicHoliday/{country}
NextWorldwideFunction: GET http://localhost:7071/api/NextPublicHolidaysWorldwide
NextByCountryFunction: GET http://localhost:7071/api/NextPublicHolidays/{country}

## TODOs / Future Improvements

- [ ] **Detailed error handling**

  - Validate `year` is numeric, `country` is two-letter string
  - Return JSON error payloads (400/404/502) instead of raw text
  - Log exceptions and stack traces to Application Insights in Azure

- [ ] **Local.settings.json**

  - Add a sample `local.settings.json` for local debugging
  - Git-ignore it so no secrets are committed

- [ ] **Azure Deployment**

  - Outline steps to create an Azure Function App, Resource Group, Storage Account
  - Document how to `func azure functionapp publish <name>`
  - Include any ARM/Bicep/Terraform snippet for infra provisioning

- [ ] **Unit & Integration Tests**

  - Add a small pytest suite that hits each endpoint (e.g. using `pytest-azure-functions`)
  - Mock out `requests.get` so external calls don’t fail in CI

- [ ] **Health Check Endpoint**

  - (Optional) Add a `/health` HTTP trigger that checks both Python runtime and Nager.Date connectivity
  - Return `{ "status": "Healthy" }` if able to ping `https://date.nager.at/api/v3/IsTodayPublicHoliday/US`

- [ ] **Versioning / CI**
  - Add GitHub Actions to lint Python, run tests, and automatically publish on successful merges to `main`.
