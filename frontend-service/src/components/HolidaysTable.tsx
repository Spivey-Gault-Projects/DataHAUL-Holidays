import { Holiday } from "../types/types";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { format, parseISO } from "date-fns";

interface HolidaysTableProps {
  rows: Holiday[];
  loading: boolean;
  onHolidayClick: (h: Holiday) => void;
}

export function HolidaysTable({
  rows,
  loading,
  onHolidayClick,
}: HolidaysTableProps) {
  if (loading) {
    return <Typography>Loading holidays…</Typography>;
  }
  if (!rows.length) {
    return <Typography>No holidays found for your search.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {rows.map((h) => {
        const dt = parseISO(h.date);
        return (
          <Grid item xs={12} sm={6} md={4} key={`${h.date}-${h.name}`}>
            <Card
              variant="outlined"
              sx={{
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: 4 },
              }}
              onClick={() => onHolidayClick(h)}
            >
              <CardHeader
                title={h.localName}
                subheader={h.name}
                sx={{ pb: 0 }}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {format(dt, "MMM d, yyyy")}
                </Typography>
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  <Chip label={h.countryCode} size="small" />
                  <Chip
                    label={h.fixed ? "Fixed" : "Floating"}
                    size="small"
                    color={h.fixed ? "success" : "default"}
                  />
                  {h.global && (
                    <Chip label="Global" size="small" color="info" />
                  )}
                  {h.launchYear != null && (
                    <Chip
                      label={`Since ${h.launchYear}`}
                      size="small"
                      color="warning"
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
