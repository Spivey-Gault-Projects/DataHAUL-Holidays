import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { fetchHolidays } from "../../api/holidaysApi";
import { Holiday } from "../../types/types";

export function HolidaysPage() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [country, setCountry] = useState<string>("US");
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const data = await fetchHolidays(year, country.toUpperCase());
      // assign unique IDs for DataGrid
      setHolidays(data.map((h, i) => ({ ...h, id: i + 1 })));
    } catch (err) {
      console.error(err);
      // TODO Add toast messaging
      alert("Error fetching holidays");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <TextField
          label="Country Code"
          value={country}
          inputProps={{ maxLength: 2 }}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button variant="contained" onClick={handleFetch} disabled={loading}>
          {loading ? "Loading..." : "Fetch Holidays"}
        </Button>
      </Box>

      {/* <HolidaysTable rows={holidays} loading={loading} /> */}
    </>
  );
}
