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
