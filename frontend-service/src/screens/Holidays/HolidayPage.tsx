// src/screens/Holidays/HolidayPage.tsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Divider,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Grid2 } from "@mui/material";
import { Holiday } from "../../types/types";

export function HolidayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  // we passed the full Holiday row via state
  const holiday = location.state as Holiday | undefined;

  if (!holiday) {
    return (
      <Box mt={4} textAlign="center">
        <Typography variant="h6" color="error">
          No holiday data found.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIosIcon />}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Card sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIosIcon />}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
        }
        title={
          <Typography variant="h4" component="div">
            {holiday.localName}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle1" color="textSecondary">
            ({holiday.name})
          </Typography>
        }
        sx={{ pb: 0 }}
      />

      <Divider />

      <CardContent>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 6 }}>
            <Stack spacing={theme.spacing(2)}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Date
                </Typography>
                <Typography variant="body1">
                  {new Date(holiday.date).toLocaleDateString("en-US")}
                </Typography>{" "}
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Country Code
                </Typography>
                <Typography variant="body1">{holiday.countryCode}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Launch Year
                </Typography>
                <Typography variant="body1">
                  {holiday.launchYear ?? "—"}
                </Typography>
              </Box>
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 6 }}>
            <Stack spacing={theme.spacing(2)}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Fixed Holiday
                </Typography>
                <Typography variant="body1">
                  {holiday.fixed ? "Yes" : "No"}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Global
                </Typography>
                <Typography variant="body1">
                  {holiday.global ? "Yes" : "No"}
                </Typography>
              </Box>
            </Stack>
          </Grid2>
        </Grid2>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", pr: 3, pb: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
}
