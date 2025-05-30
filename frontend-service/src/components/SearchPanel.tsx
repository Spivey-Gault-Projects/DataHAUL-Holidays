import { Box, Autocomplete, TextField, Button } from "@mui/material";
import { Country } from "../types/types";

interface SearchPanelProps {
  countries: Country[];
  loadingCountries: boolean;
  year: number;
  country: Country | null;
  setYear: (y: number) => void;
  setCountry: (c: Country | null) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchPanel({
  countries,
  loadingCountries,
  year,
  country,
  setYear,
  setCountry,
  onSearch,
  loading,
}: SearchPanelProps) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
      <Autocomplete
        options={countries}
        getOptionLabel={(o) => o.name}
        value={country}
        onChange={(_, v) => setCountry(v)}
        loading={loadingCountries}
        sx={{ minWidth: 240 }}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <TextField
        label="Year"
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      />
      <Button
        variant="contained"
        onClick={onSearch}
        disabled={loading || !country}
      >
        {loading ? "Loading..." : "Search"}
      </Button>
    </Box>
  );
}
