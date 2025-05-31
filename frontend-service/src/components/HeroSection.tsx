import { Box, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        borderRadius: 2,
        backgroundColor: "#080808",
        boxShadow: 3,
        color: "#ffffff",
      }}
    >
      <Typography variant="h2" gutterBottom>
        <Box component="span" sx={{ color: "#FFFFFF" }}>
          Data
        </Box>
        <Box component="span" sx={{ color: "#556AFF" }}>
          HAUL
        </Box>
        <Box component="span" sx={{ color: "#FFFFFF" }}>
          Holidays Explorer
        </Box>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: 600,
          mx: "auto",
          mb: 2,
          color: "rgba(255,255,255,0.9)",
        }}
      >
        Browse upcoming holidays worldwide, or pick a country to:
        <ul style={{ textAlign: "left", margin: "8px auto", maxWidth: 500 }}>
          <li>View all public holidays over the next 365 days</li>
          <li>See a year-by-year holiday list</li>
          <li>Discover long-weekend opportunities</li>
          <li>Compare holiday counts across up to 3 countries</li>
        </ul>
      </Typography>
    </Box>
  );
}
