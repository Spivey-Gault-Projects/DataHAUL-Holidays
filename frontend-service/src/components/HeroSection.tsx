import { Box, Typography } from "@mui/material";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
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
      <Typography variant="h6" gutterBottom>
        Explore holidays around the world!
      </Typography>
    </Box>
  );
}
