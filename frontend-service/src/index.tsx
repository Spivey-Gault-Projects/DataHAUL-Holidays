import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={qc}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
