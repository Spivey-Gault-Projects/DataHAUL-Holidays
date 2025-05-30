import axios from "axios";
import { Country, Holiday, LongWeekend } from "../types/types";

const base = process.env.REACT_APP_API_BASE_URL!;

/**
 * Fetches holidays for the given year and country code.
 */
export async function fetchHolidays(year: number, countryCode: string) {
  const r = await axios.get<Holiday[]>(
    `${base}/holidays/${year}/${countryCode}`
  );
  return r.data;
}

/**
 * Fetches the list of countries supported by the API.
 */
export async function fetchCountries() {
  const r = await axios.get<Country[]>(`${base}/countries`);
  return r.data;
}

/**
 * Fetches long weekends for the given year and country.
 */
export async function fetchLongWeekends(year: number, countryCode: string) {
  const r = await axios.get<LongWeekend[]>(
    `${base}/longweekends/${year}/${countryCode}`
  );
  return r.data;
}

/**
 * Fetches whether today is a public holiday in the given country.
 */
export async function fetchIsTodayPublicHoliday(countryCode: string) {
  const r = await axios.get<boolean>(
    `${base}/holidays/is-today/${countryCode}`
  );
  return r.data;
}

/**
 * Fetches the next worldwide holidays for the next 7 days.
 */
export async function fetchNextWorldwide(): Promise<Holiday[]> {
  const r = await axios.get<Holiday[]>(`${base}/holidays/nextholidays`);
  return r.data;
}

/**
 * Fetches the next 365 days of holidays for a given country.
 */
export async function fetchNext365(countryCode: string): Promise<Holiday[]> {
  const r = await axios.get<Holiday[]>(
    `${base}/holidays/next365/${countryCode}`
  );
  return r.data;
}
