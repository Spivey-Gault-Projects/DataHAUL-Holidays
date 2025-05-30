import axios from "axios";
import { Country, Holiday, LongWeekend } from "../types/types";

const base = process.env.REACT_APP_API_BASE_URL!;

export async function fetchHolidays(year: number, countryCode: string) {
  const r = await axios.get<Holiday[]>(
    `${base}/holidays/${year}/${countryCode}`
  );
  return r.data;
}

export async function fetchCountries() {
  const r = await axios.get<Country[]>(`${base}/countries`);
  return r.data;
}

export async function fetchLongWeekends(year: number, countryCode: string) {
  const r = await axios.get<LongWeekend[]>(
    `${base}/longweekends/${year}/${countryCode}`
  );
  return r.data;
}

export async function fetchIsTodayPublicHoliday(countryCode: string) {
  const r = await axios.get<boolean>(
    `${base}/holidays/is-today/${countryCode}`
  );
  return r.data;
}

export async function fetchNextWorldwide(): Promise<Holiday[]> {
  const r = await axios.get<Holiday[]>(`${base}/nextholidays`);
  return r.data;
}
