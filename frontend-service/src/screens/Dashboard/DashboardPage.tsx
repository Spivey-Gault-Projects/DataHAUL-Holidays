import { useRef } from "react";
import { Box } from "@mui/material";
import HeroSection from "../../components/HeroSection";
import ExplorerSection from "../../components/ExplorerSection";

export default function DashboardPage() {
  const explorerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <HeroSection
        onGetStarted={() =>
          explorerRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <Box ref={explorerRef} sx={{ p: 4 }}>
        <ExplorerSection />
      </Box>
    </>
  );
}
