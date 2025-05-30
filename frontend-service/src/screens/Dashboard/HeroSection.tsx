import { Box, Typography, Button, useTheme } from "@mui/material";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Typography variant="h2" gutterBottom>
        DataHAUL Holidays Explorer
      </Typography>
      <Typography variant="h6" gutterBottom>
        Explore holidays and long weekends around the world
      </Typography>
      <Button variant="contained" size="large" onClick={onGetStarted}>
        Get Started
      </Button>
    </Box>
  );
}
