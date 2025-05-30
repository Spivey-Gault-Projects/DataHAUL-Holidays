export interface LongWeekend {
  startDate: string; // ISO date
  endDate: string; // ISO date
  days: number;
}

export interface Country {
  countryCode: string;
  name: string;
}

export interface Holiday {
  id: number;
  localName: string;
  name: string;
  date: string; // ISO date string
  countryCode: string;
  fixed: boolean;
  global: boolean;
  launchYear?: number;
  types: string[];
  counties?: string[];
}
