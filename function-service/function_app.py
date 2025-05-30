import logging
import azure.functions as func
import requests

# base Nager.Date URL
BASE_URL = "https://date.nager.at/api/v3"

app = func.FunctionApp()

@app.route(route="Holidays/{year}/{country}", auth_level=func.AuthLevel.ANONYMOUS)
def HolidaysFunction(req: func.HttpRequest) -> func.HttpResponse:
    year    = req.route_params.get("year")
    country = req.route_params.get("country")
    if not (year and country):
        return func.HttpResponse(
            "Usage: GET /api/Holidays/{year}/{country}", status_code=400
        )
    url = f"{BASE_URL}/publicholidays/{year}/{country.upper()}"
    resp = requests.get(url)
    return func.HttpResponse(
        body=resp.text,
        status_code=resp.status_code,
        mimetype="application/json"
    )

@app.route(route="LongWeekend/{year}/{country}", auth_level=func.AuthLevel.ANONYMOUS)
def LongWeekendsFunction(req: func.HttpRequest) -> func.HttpResponse:
    year    = req.route_params.get("year")
    country = req.route_params.get("country")
    if not (year and country):
        return func.HttpResponse(
            "Usage: GET /api/LongWeekend/{year}/{country}", status_code=400
        )
    url = f"{BASE_URL}/LongWeekend/{year}/{country.upper()}"
    resp = requests.get(url)
    return func.HttpResponse(
        body=resp.text,
        status_code=resp.status_code,
        mimetype="application/json"
    )

@app.route(route="IsTodayPublicHoliday/{country}", auth_level=func.AuthLevel.ANONYMOUS)
def IsTodayFunction(req: func.HttpRequest) -> func.HttpResponse:
    country = req.route_params.get("country")
    if not country:
        return func.HttpResponse(
            "Usage: GET /api/IsTodayPublicHoliday/{country}", status_code=400
        )
    url = f"{BASE_URL}/IsTodayPublicHoliday/{country.upper()}"
    resp = requests.get(url)
    return func.HttpResponse(
        body=resp.text,
        status_code=resp.status_code,
        mimetype="application/json"
    )

@app.route(route="NextPublicHolidaysWorldwide", auth_level=func.AuthLevel.ANONYMOUS)
def NextWorldwideFunction(req: func.HttpRequest) -> func.HttpResponse:
    """GET /api/NextPublicHolidaysWorldwide"""
    url = f"{BASE_URL}/NextPublicHolidaysWorldwide"
    resp = requests.get(url)
    return func.HttpResponse(
        body=resp.text,
        status_code=resp.status_code,
        mimetype="application/json"
    )

@app.route(route="NextPublicHolidays/{country}", auth_level=func.AuthLevel.ANONYMOUS)
def NextByCountryFunction(req: func.HttpRequest) -> func.HttpResponse:
    """GET /api/NextPublicHolidays/{country}"""
    country = req.route_params.get("country")
    if not country:
        return func.HttpResponse(
            "Usage: GET /api/NextPublicHolidays/{country}",
            status_code=400
        )
    url = f"{BASE_URL}/NextPublicHolidays/{country.upper()}"
    resp = requests.get(url)
    return func.HttpResponse(
        body=resp.text,
        status_code=resp.status_code,
        mimetype="application/json"
    )