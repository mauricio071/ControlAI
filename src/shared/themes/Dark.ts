import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
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
      paper: "#303134",
      default: "#202124",
    },
  },
  typography: {
    allVariants: { color: "white" },
  },
});
