import { useState } from "react";
import { Box, Tabs, Tab, Drawer, Typography, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import SearchPanel from "./SearchPanel";
import {
  fetchCountries,
  fetchHolidays,
  fetchLongWeekends,
} from "../../api/holidaysApi";
import LongWeekendsTable from "../../components/LongWeekendsTable";
import TodayCard from "../../components/TodayCard";
import CompareSection from "../../components/CompareSection";
import { Country } from "../../types/Country";
import { Holiday } from "../../types/Holiday";
import { LongWeekend } from "../../types/LongWeekend";
import { HolidaysTable } from "../../components/HolidaysTable";

export default function ExplorerSection() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [country, setCountry] = useState<Country | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  // Countries
  const { data: countries = [], isLoading: loadingCountries } = useQuery<
    Country[],
    Error
  >({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  // Holidays
  const holidaysQuery = useQuery<Holiday[], Error>({
    queryKey: ["holidays", year, country?.countryCode],
    queryFn: () => fetchHolidays(year, country!.countryCode),
    enabled: false,
  });

  // Long weekends
  const longWeekendsQuery = useQuery<LongWeekend[], Error>({
    queryKey: ["longWeekends", year, country?.countryCode],
    queryFn: () => fetchLongWeekends(year, country!.countryCode),
    enabled: false,
  });

  const doSearch = () => {
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
        onSearch={doSearch}
        loading={holidaysQuery.isFetching || longWeekendsQuery.isFetching}
      />

      <TodayCard country={country} />

      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
        <Tab label="Holidays" />
        <Tab label="Long Weekends" />
        <Tab label="Compare" />
      </Tabs>

      <Box sx={{ mt: 2, height: activeTab < 2 ? 400 : "auto" }}>
        {activeTab === 0 && (
          <HolidaysTable
            rows={holidaysQuery.data || []}
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
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6">Raw JSON</Typography>
          <Divider sx={{ my: 1 }} />
          <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
        </Box>
      </Drawer>
    </>
  );
}
