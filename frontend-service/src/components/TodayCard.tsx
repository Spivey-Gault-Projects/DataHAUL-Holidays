import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchIsTodayPublicHoliday } from "../api/holidaysApi";
import { Country } from "../types/types";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface TodayCardProps {
  country: Country | null;
}

export default function TodayCard({ country }: TodayCardProps) {
  const { data, isFetching, refetch, error } = useQuery<boolean, Error>({
    queryKey: ["today", country?.countryCode],
    queryFn: () => fetchIsTodayPublicHoliday(country!.countryCode),
    enabled: Boolean(country),
    staleTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    if (error) toast.error(`Today‐check failed: ${error!.message}`);
  }, [error]);

  if (!country) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6">
          Is today a holiday in {country.name}?
        </Typography>

        {isFetching ? (
          <Typography>Checking…</Typography>
        ) : data === undefined ? (
          <Typography color="textSecondary">Tap to check.</Typography>
        ) : (
          <Typography variant="h5">{data ? "Yes 🎉" : "No 🙏"}</Typography>
        )}

        <Box mt={2}>
          <Button
            variant="outlined"
            onClick={() => country && refetch()}
            disabled={isFetching}
          >
            Check Today
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
