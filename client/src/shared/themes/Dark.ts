import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D8854B",
      dark: "#B96B3F",
      light: "#E49B69",
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
    cGray: {
      main: "#D3D3D3",
      light: "#D3D3D3",
      dark: "#333333",
      contrastText: "#ffffff",
    },
  },
  typography: {
    allVariants: { color: "white" },
    fontFamily: "'Inter', sans-serif",
  },
});
