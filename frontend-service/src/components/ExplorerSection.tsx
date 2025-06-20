import { useEffect, useMemo, useState } from "react";
import { Box, Tabs, Tab, Drawer, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import SearchPanel from "./SearchPanel";
import {
  fetchCountries,
  fetchHolidays,
  fetchLongWeekends,
  fetchNext365,
  fetchNextWorldwide,
} from "../api/holidaysApi";
import LongWeekendsTable from "./LongWeekendsSection";
import TodayCard from "./TodayCard";
import CompareSection from "./CompareSection";

import { Country, Holiday, LongWeekend } from "../types/types";
import DetailedHolidayView from "./DetailedHolidayView";
import UpcomingCalendar from "./UpcomingCalendar";
import YearCalendar from "./YearCalendar";
import LongWeekendDetail from "./LongWeekendDetail";
import { HolidaysSection } from "./HolidaysSection";
import { toast } from "react-toastify";

export default function ExplorerSection() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [country, setCountry] = useState<Country | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  /**
   * Query used to fetch the list of countries
   */
  const {
    data: countries = [],
    isLoading: loadingCountries,
    isError: isCountriesError,
    error: countriesError,
  } = useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
  useEffect(() => {
    if (isCountriesError && countriesError)
      toast.error(`Countries load failed: ${countriesError.message}`);
  }, [isCountriesError, countriesError]);

  /**
   * Query used to fetch holidays for the selected year and country
   */
  const holidaysQuery = useQuery<Holiday[], Error>({
    queryKey: ["holidays", year, country?.countryCode],
    queryFn: () => fetchHolidays(year, country!.countryCode),
    enabled: activeTab === 2 && !!country,
  });
  useEffect(() => {
    if (holidaysQuery.error)
      toast.error(`Holidays load failed: ${holidaysQuery.error.message}`);
  }, [holidaysQuery.error]);
  /**
   * Query used to fetch long weekends for the selected year and country
   */
  const longWeekendsQuery = useQuery<LongWeekend[], Error>({
    queryKey: ["longWeekends", year, country?.countryCode],
    queryFn: () => fetchLongWeekends(year, country!.countryCode),
    enabled: false,
  });
  useEffect(() => {
    if (longWeekendsQuery.error)
      toast.error(`Long‐weekends failed: ${longWeekendsQuery.error.message}`);
  }, [longWeekendsQuery.error]);
  /**
   * Query used to fetch the next worldwide holidays
   */
  const nextWorldwideQuery = useQuery<Holiday[], Error>({
    queryKey: ["nextWorldwide"],
    queryFn: fetchNextWorldwide,
    enabled: activeTab === 0,
  });
  useEffect(() => {
    if (nextWorldwideQuery.error)
      toast.error(
        `Upcoming holidays failed: ${nextWorldwideQuery.error.message}`
      );
  }, [nextWorldwideQuery.error]);

  /**
   * Query used to fetch the next 365 days of holidays for the selected country
   */
  const next365Query = useQuery<Holiday[], Error>({
    queryKey: ["next365", country?.countryCode],
    queryFn: () => fetchNext365(country!.countryCode),
    enabled: activeTab === 1 && !!country,
  });
  useEffect(() => {
    if (next365Query.error)
      toast.error(`365‐day view failed: ${next365Query.error.message}`);
  }, [next365Query.error]);
  /**
   * Effect that will run when we switch to the Holidays tab (tab 2) and a country is selected, refetching holidays.
   */
  useEffect(() => {
    if (activeTab === 2 && country) {
      holidaysQuery.refetch();
    }
  }, [activeTab, country]);

  const uniqueHolidays = useMemo(() => {
    const seen = new Set<string>();
    return (holidaysQuery.data ?? []).filter((h) => {
      const key = `${h.date}::${h.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [holidaysQuery.data]);

  const handleSearch = () => {
    holidaysQuery.refetch();
    longWeekendsQuery.refetch();
  };

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setDrawerOpen(true);
  };

  return (
    <>
      <SearchPanel
        countries={countries}
        loadingCountries={loadingCountries}
        year={year}
        country={country}
        setYear={setYear}
        setCountry={setCountry}
        onSearch={handleSearch}
        loading={holidaysQuery.isFetching || longWeekendsQuery.isFetching}
      />

      <TodayCard country={country} />

      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
        <Tab label="Upcoming (7 days)" /> {/* idx = 0 */}
        <Tab label="Next 365 Days" /> {/* idx = 1 */}
        <Tab label="Holidays" /> {/* idx = 2 */}
        <Tab label="Long Weekends" /> {/* idx = 3 */}
        <Tab label="Compare" /> {/* idx = 4 */}
      </Tabs>

      <Box sx={{ mt: 2, height: activeTab < 2 ? 400 : "auto" }}>
        {activeTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <UpcomingCalendar
              holidays={nextWorldwideQuery.data || []}
              countries={countries}
              onHolidayClick={handleRowClick}
            />
          </Box>
        )}
        {activeTab === 1 &&
          (country ? (
            <>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Viewing the next 365 days of public holidays for {country.name}.
              </Typography>
              <YearCalendar
                holidays={next365Query.data || []}
                onHolidayClick={handleRowClick}
              />
            </>
          ) : (
            <Typography>
              Select a country first to load the 365-day calendar.
            </Typography>
          ))}
        {activeTab === 2 && (
          <HolidaysSection
            rows={uniqueHolidays}
            loading={holidaysQuery.isFetching}
            onHolidayClick={handleRowClick}
          />
        )}

        {activeTab === 3 && (
          <LongWeekendsTable
            rows={longWeekendsQuery.data || []}
            loading={longWeekendsQuery.isFetching}
            onRowClick={handleRowClick}
          />
        )}
        {activeTab === 4 && (
          <CompareSection countries={countries} year={year} />
        )}
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box>
          {selectedRow &&
            // If the object has a startDate, treat it as a LongWeekend,
            // otherwise it’s a Holiday.
            ("startDate" in selectedRow ? (
              <LongWeekendDetail weekend={selectedRow as LongWeekend} />
            ) : (
              <DetailedHolidayView holiday={selectedRow as Holiday} />
            ))}
        </Box>
      </Drawer>
    </>
  );
}
