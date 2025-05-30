import { Box, Typography } from "@mui/material";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 4,
        px: 2,
        borderRadius: 2,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.accent.main} 0%, ${theme.palette.primary.main} 100%)`,
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      <Typography variant="h2" gutterBottom>
        DataHAUL Holidays Explorer
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
