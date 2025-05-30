import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: {
      main: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    accent?: {
      main: string;
      contrastText: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00B8D9", // bright cyan
      contrastText: "#fff",
    },
    secondary: {
      main: "#1F2937", // dark slate
      contrastText: "#fff",
    },
    accent: {
      main: "#FFA000", // a warm gold accent
      contrastText: "#000",
    },
    background: {
      default: "#F7FAFC", // very light gray
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),
    h2: {
      fontWeight: 700,
      color: "#111827",
    },
    h6: {
      fontWeight: 500,
      color: "#4B5563",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F7FAFC",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
      },
    },
  },
});
