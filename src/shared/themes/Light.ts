import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#EAA221",
      dark: "#C7861B",
      light: "#F4B844",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2879A8",
      dark: "#1E5B81",
      light: "#3E92C1",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#ffffff",
      default: "#f7f6f3",
    },
  },
});
