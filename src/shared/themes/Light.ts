import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#F4A261",
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
      paper: "#ffffff",
      default: "#f7f6f3",
    },
  },
});
