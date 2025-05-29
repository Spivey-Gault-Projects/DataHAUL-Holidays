import { useMemo, useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Country } from "../types/Country";
import { Holiday } from "../types/Holiday";
import { fetchHolidays } from "../api/holidaysApi";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

export default function CompareSection({
  countries,
  year,
}: {
  countries: Country[];
  year: number;
}) {
  const [selected, setSelected] = useState<Country[]>([]);
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["compare", year, selected.map((c) => c.countryCode).join(",")],
    queryFn: async () =>
      Promise.all(selected.map((c) => fetchHolidays(year, c.countryCode))),
    enabled: false,
  });

  // build chart data
  const chartData = useMemo(() => {
    if (!data) return [];
    const months: Record<string, any> = {};
    selected.forEach((c, i) => {
      data[i].forEach((h: Holiday) => {
        const m = new Date(h.date).toLocaleString("en-US", { month: "short" });
        months[m] = months[m] || { month: m };
        months[m][c.countryCode] = (months[m][c.countryCode] || 0) + 1;
      });
    });
    return Object.values(months);
  }, [data, selected]);

  return (
    <Box>
      <Autocomplete
        multiple
        options={countries}
        getOptionLabel={(o) => o.name}
        value={selected}
        onChange={(_, v) => setSelected(v)}
        renderInput={(p) => <TextField {...p} label="Compare Countries" />}
        sx={{ mb: 2, minWidth: 240 }}
      />

      <Button
        variant="contained"
        disabled={!selected.length}
        onClick={() => refetch()}
      >
        {isFetching ? "Loading…" : "Compare"}
      </Button>

      {data && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            {selected.map((c) => (
              <Bar key={c.countryCode} dataKey={c.countryCode} name={c.name} />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
