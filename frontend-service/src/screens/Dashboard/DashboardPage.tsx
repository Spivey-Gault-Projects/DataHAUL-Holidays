import { useRef } from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import ExplorerSection from "./ExplorerSection";

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
