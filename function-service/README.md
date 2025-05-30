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

- curl http://localhost:7071/api/Holidays/2025/US
- curl http://localhost:7071/api/LongWeekend/2025/US
- curl http://localhost:7071/api/IsTodayPublicHoliday/US

Endpoints:

- GET /api/Holidays/{year}/{country}
  - List all public holidays for given year & country code.
- GET /api/LongWeekend/{year}/{country}
  - List all long-weekend periods for given year & country.
- GET /api/IsTodayPublicHoliday/{country}
  - Returns true/false if today is a holiday.
