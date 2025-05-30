import { Box, Typography, useTheme } from "@mui/material";

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
        Explore holidays around the world!
      </Typography>
    </Box>
  );
}
