import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#ee6e73",
      light: "#ff9fa2",
      dark: "#b73d48",
      contrastText: "#000000",
    },
    secondary: {
      main: "#ffccbc",
      light: "#ffffee",
      dark: "#cb9b8c",
      contrastText: "#000000",
    },
    text: {
      primary: "#000",
      secondary: "#000",
      disabled: "#555",
    },
    success: {
      main: "#ee6e73",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
