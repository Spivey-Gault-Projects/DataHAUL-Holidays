import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-big-calendar/lib/css/react-big-calendar.css";

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <CssBaseline />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
