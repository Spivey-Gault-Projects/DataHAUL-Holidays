import axios from "axios";
import { Holiday } from "../types/Holiday";

const base = process.env.REACT_APP_API_BASE_URL!;

export async function fetchHolidays(
  year: number,
  countryCode: string
): Promise<Holiday[]> {
  const response = await axios.get<Holiday[]>(
    `${base}/holidays/${year}/${countryCode}`
  );
  return response.data;
}
