import { useMemo, useState } from "react";
import { Box, Tabs, Tab, Drawer } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import SearchPanel from "./SearchPanel";
import {
  fetchCountries,
  fetchHolidays,
  fetchLongWeekends,
  fetchNextWorldwide,
} from "../../api/holidaysApi";
import LongWeekendsTable from "../../components/LongWeekendsTable";
import TodayCard from "../../components/TodayCard";
import CompareSection from "../../components/CompareSection";

import { HolidaysTable } from "../../components/HolidaysTable";
import { Country, Holiday, LongWeekend } from "../../types/types";
import DetailedHolidayView from "../../components/DetailedHolidayView";
import UpcomingCalendar from "../../components/UpcomingCalendar";

export default function ExplorerSection() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [country, setCountry] = useState<Country | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  /**
   * Query used to fetch the list of countries
   */
  const { data: countries = [], isLoading: loadingCountries } = useQuery<
    Country[],
    Error
  >({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  /**
   * Query used to fetch holidays for the selected year and country
   */
  const holidaysQuery = useQuery<Holiday[], Error>({
    queryKey: ["holidays", year, country?.countryCode],
    queryFn: () => fetchHolidays(year, country!.countryCode),
    enabled: false,
  });

  /**
   * Query used to fetch long weekends for the selected year and country
   */
  const longWeekendsQuery = useQuery<LongWeekend[], Error>({
    queryKey: ["longWeekends", year, country?.countryCode],
    queryFn: () => fetchLongWeekends(year, country!.countryCode),
    enabled: false,
  });

  /**
   * Query used to fetch the next worldwide holidays
   */
  const nextWorldwideQuery = useQuery<Holiday[], Error>({
    queryKey: ["nextWorldwide"],
    queryFn: fetchNextWorldwide,
    enabled: activeTab === 3,
  });

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
        <Tab label="Holidays" />
        <Tab label="Long Weekends" />
        <Tab label="Compare" />
        <Tab label="Upcoming (7d)" />
      </Tabs>

      <Box sx={{ mt: 2, height: activeTab < 2 ? 400 : "auto" }}>
        {activeTab === 0 && (
          <HolidaysTable
            rows={uniqueHolidays}
            loading={holidaysQuery.isFetching}
            onRowClick={handleRowClick}
          />
        )}
        {activeTab === 1 && (
          <LongWeekendsTable
            rows={longWeekendsQuery.data || []}
            loading={longWeekendsQuery.isFetching}
            onRowClick={handleRowClick}
          />
        )}
        {activeTab === 2 && (
          <CompareSection countries={countries} year={year} />
        )}
        {activeTab === 3 && (
          <Box sx={{ mt: 2 }}>
            <UpcomingCalendar
              holidays={nextWorldwideQuery.data || []}
              onHolidayClick={handleRowClick}
            />
          </Box>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box>
          {selectedRow && <DetailedHolidayView holiday={selectedRow} />}
        </Box>
      </Drawer>
    </>
  );
}
