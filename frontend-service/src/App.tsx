import { Container, Typography } from "@mui/material";
import React from "react";
import { HolidaysPage } from "./screens/Holidays/HolidaysPage";

function App() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        DataHaul Holidays Viewer
      </Typography>
      <HolidaysPage />
    </Container>
  );
}

export default App;
