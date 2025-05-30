import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Autocomplete,
  TextField,
  Button,
  Typography,
  useTheme,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";
import { Country, Holiday } from "../types/types";
import { fetchHolidays } from "../api/holidaysApi";

const MAX_COMPARE = 3;

type ChartEntry = {
  month: string;
  [countryCode: string]: number | string;
};

export default function CompareSection({
  countries,
  year,
}: {
  countries: Country[];
  year: number;
}) {
  const theme = useTheme();

  const [selected, setSelected] = useState<Country[]>([]);

  /**
   * Custom hook to fetch holidays for multiple countries
   */
  const { data, refetch, isFetching } = useQuery<Holiday[][], Error>({
    queryKey: ["compare", year, selected.map((c) => c.countryCode).join(",")],
    queryFn: async () =>
      Promise.all(selected.map((c) => fetchHolidays(year, c.countryCode))),
    enabled: false,
  });

  /**
   * Transforms the fetched holiday data into a format suitable for the chart.
   */
  const chartData = useMemo<ChartEntry[]>(() => {
    if (!data) return [];
    const monthsMap: Record<string, ChartEntry> = {};
    selected.forEach((c, idx) => {
      data[idx].forEach((h) => {
        const m = new Date(h.date).toLocaleString("en-US", {
          month: "short",
        });
        if (!monthsMap[m]) monthsMap[m] = { month: m };
        monthsMap[m][c.countryCode] =
          ((monthsMap[m][c.countryCode] as number) || 0) + 1;
      });
    });
    return Object.values(monthsMap);
  }, [data, selected]);

  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerHolidays, setDrawerHolidays] = useState<Holiday[]>([]);
  const [drawerTitle, setDrawerTitle] = useState<string>("");

  const handleBarClick = (countryCode: string, month: string) => {
    const idx = selected.findIndex((c) => c.countryCode === countryCode);
    if (idx < 0 || !data) return;
    const list = data[idx].filter(
      (h) =>
        new Date(h.date).toLocaleString("en-US", { month: "short" }) === month
    );
    setDrawerHolidays(list);
    setDrawerTitle(`${selected[idx].name} — ${month} ${year}`);
    setDrawerOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader title="Compare Holidays by Country" subheader={`${year}`} />
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            mb={3}
          >
            <Autocomplete
              multiple
              options={countries}
              getOptionLabel={(o) => o.name}
              value={selected}
              onChange={(_, v) => {
                if (v.length <= MAX_COMPARE) setSelected(v);
              }}
              renderInput={(p) => (
                <TextField
                  {...p}
                  label={`Select up to ${MAX_COMPARE}`}
                  helperText={
                    selected.length >= MAX_COMPARE
                      ? `Maximum of ${MAX_COMPARE} countries`
                      : ""
                  }
                />
              )}
              sx={{ flexGrow: 1, minWidth: 200 }}
            />
            <Button
              variant="contained"
              onClick={() => refetch()}
              disabled={selected.length < 2 || isFetching}
            >
              {isFetching ? "Comparing…" : "Compare"}
            </Button>
          </Stack>

          {selected.length < 2 ? (
            <Typography color="textSecondary">
              Pick at least two countries to compare.
            </Typography>
          ) : !data ? (
            <Typography color="textSecondary">
              Click “Compare” to load data.
            </Typography>
          ) : chartData.length === 0 ? (
            <Typography color="textSecondary">
              No holiday data found for the selected countries.
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 30, bottom: 40 }}
              >
                <XAxis
                  dataKey="month"
                  label={{
                    value: "Month",
                    position: "insideBottom",
                    dy: 10,
                  }}
                />
                <YAxis
                  allowDecimals={false}
                  label={{
                    value: "Holidays",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {selected.map((c, idx) => (
                  <Bar
                    key={c.countryCode}
                    dataKey={c.countryCode}
                    name={c.name}
                    fill={colors[idx]}
                    barSize={20}
                    onClick={(entry: ChartEntry, index: number) =>
                      handleBarClick(c.countryCode, entry.month)
                    }
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 360, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{drawerTitle}</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
          {drawerHolidays.length > 0 ? (
            <List>
              {drawerHolidays.map((h) => (
                <ListItem key={h.date + h.localName} disablePadding>
                  <ListItemText
                    primary={h.localName}
                    secondary={`${h.name} — ${new Date(
                      h.date
                    ).toLocaleDateString("en-US")}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary">
              No holidays this month.
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
}
