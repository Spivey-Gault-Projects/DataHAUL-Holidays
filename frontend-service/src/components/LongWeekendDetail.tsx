import { Box, Typography, Divider, Stack } from "@mui/material";
import { parseISO, format, differenceInCalendarDays } from "date-fns";
import { LongWeekend } from "../types/types";

interface LongWeekendDetailProps {
  weekend: LongWeekend;
}

export default function LongWeekendDetail({ weekend }: LongWeekendDetailProps) {
  const start = parseISO(weekend.startDate);
  const end = parseISO(weekend.endDate);
  const days = differenceInCalendarDays(end, start) + 1;

  return (
    <Box sx={{ width: 360, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {`${format(start, "MMM d")} – ${format(end, "MMM d")}`}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1}>
        <Box>
          <Typography variant="caption" color="textSecondary">
            Duration
          </Typography>
          <Typography variant="body1">
            {days} day{days > 1 ? "s" : ""}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="textSecondary">
            Starts On
          </Typography>
          <Typography variant="body1">
            {format(start, "EEEE, MMM d, yyyy")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="textSecondary">
            Ends On
          </Typography>
          <Typography variant="body1">
            {format(end, "EEEE, MMM d, yyyy")}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
