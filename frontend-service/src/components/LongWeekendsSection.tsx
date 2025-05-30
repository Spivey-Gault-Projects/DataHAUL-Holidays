import { Grid, Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { LongWeekend } from "../types/types";

interface LongWeekendsSectionProps {
  rows: LongWeekend[];
  onRowClick: (row: LongWeekend) => void;
  loading: boolean;
}

export default function LongWeekendsSection({
  rows,
  onRowClick,
  loading,
}: LongWeekendsSectionProps) {
  if (loading) {
    return <Typography>Loading long weekends…</Typography>;
  }
  if (!rows.length) {
    return <Typography>No long weekends found.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {rows.map((r) => {
        const start = parseISO(r.startDate);
        const end = parseISO(r.endDate);
        const days = differenceInCalendarDays(end, start) + 1;
        return (
          <Grid item xs={12} sm={6} md={4} key={`${r.startDate}_${r.endDate}`}>
            <Card
              variant="outlined"
              sx={{ cursor: "pointer", "&:hover": { boxShadow: 4 } }}
              onClick={() => onRowClick(r)}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="h6">
                    {format(start, "MMM d")} – {format(end, "MMM d")}
                  </Typography>
                  <Chip
                    label={`${days} day${days > 1 ? "s" : ""}`}
                    size="small"
                  />
                </Box>
                <Typography color="textSecondary" variant="body2">
                  {days > 1
                    ? `Starts ${format(start, "EEEE")}, ends ${format(
                        end,
                        "EEEE"
                      )}`
                    : `Single-day weekend`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
