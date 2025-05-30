import { useState, useMemo } from "react";
import { Box, Paper, Typography, IconButton, Stack } from "@mui/material";
import { addDays, startOfDay, isSameDay, format } from "date-fns";

import { Holiday } from "../types/types";

interface Props {
  holidays: Holiday[];
  onHolidayClick: (h: Holiday) => void;
}

export default function UpcomingCalendar({ holidays, onHolidayClick }: Props) {
  const [start, setStart] = useState(() => startOfDay(new Date()));

  /**
   * Generate the next 7 days starting from today
   */
  const days = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => addDays(start, i)),
    [start]
  );

  /**
   * Group holidays by the next 7 days
   */
  const eventsByDay = useMemo(() => {
    return days.map((day) =>
      holidays.filter((h) => isSameDay(new Date(h.date), day))
    );
  }, [days, holidays]);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="subtitle1">
          {format(days[0], "MMM d")} – {format(days[6], "MMM d")}
        </Typography>
      </Stack>
      <Typography variant="body2" color="textSecondary" mb={2}>
        Showing the upcoming public holidays worldwide for the next 7 days,
        starting today.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
        }}
      >
        {days.map((day, idx) => (
          <Paper key={day.toISOString()} sx={{ p: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              {format(day, "EEE MM/dd")}
            </Typography>
            {eventsByDay[idx].length > 0 ? (
              eventsByDay[idx].map((h) => (
                <Typography
                  key={h.date + h.localName}
                  variant="body2"
                  sx={{ cursor: "pointer", mb: 0.5 }}
                  onClick={() => onHolidayClick(h)}
                >
                  • {h.localName}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                — no holidays —
              </Typography>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
