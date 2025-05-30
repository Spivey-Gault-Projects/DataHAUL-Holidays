import { Box, Typography, Divider, Stack, Chip } from "@mui/material";
import { Holiday } from "../types/types";

interface DetailedHolidayViewProps {
  holiday: Holiday;
}

export default function DetailedHolidayView({
  holiday,
}: DetailedHolidayViewProps) {
  return (
    <Box sx={{ width: 360, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {holiday.localName}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        ({holiday.name})
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={1}>
        <Box>
          <Typography variant="caption" color="textSecondary">
            Date
          </Typography>
          <Typography variant="body1">
            {new Date(holiday.date).toLocaleDateString("en-US")}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="textSecondary">
            Country
          </Typography>
          <Typography variant="body1">{holiday.countryCode}</Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="textSecondary">
            Fixed
          </Typography>
          <Typography variant="body1">
            {holiday.fixed ? "Yes" : "No"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="textSecondary">
            Global
          </Typography>
          <Typography variant="body1">
            {holiday.global ? "Yes" : "No"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="textSecondary">
            Launch Year
          </Typography>
          <Typography variant="body1">{holiday.launchYear ?? "—"}</Typography>
        </Box>

        {holiday.types?.length > 0 && (
          <Box>
            <Typography variant="caption" color="textSecondary">
              Types
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {holiday.types.map((t) => (
                <Chip key={t} label={t} size="small" />
              ))}
            </Stack>
          </Box>
        )}

        {(holiday.counties?.length ?? 0) > 0 && (
          <Box>
            <Typography variant="caption" color="textSecondary">
              Counties
            </Typography>
            <Typography variant="body1">
              {holiday.counties?.join(", ")}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
