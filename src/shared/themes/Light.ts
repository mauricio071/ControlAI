import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    cGray: PaletteColor;
  }
  interface PaletteOptions {
    cGray?: PaletteColorOptions;
  }
}

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#F4A261",
      dark: "#e48f52",
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
      default: "#FDF8F3",
    },
    cGray: {
      main: "#6D6D6D",
      light: "#D3D3D3",
      dark: "#333333",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});
