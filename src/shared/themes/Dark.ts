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
      main: "#408aeb",
      dark: "#1E5B81",
      light: "#49a3f1",
      contrastText: "#ffffff",
    },
    background: {
      paper: "#2A2D32",
      default: "#1E2125",
    },
  },
  typography: {
    allVariants: { color: "white" },
    fontFamily: "'Inter', sans-serif",
  },
});
