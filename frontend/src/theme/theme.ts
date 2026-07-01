import { createTheme } from "@mui/material/styles";

// Design tokens — "instrument panel" direction.
// The subject is a car shortlisting tool for the Indian market: budgets in
// lakhs, mileage in kmpl, ADAS/safety ratings. The palette and type borrow
// from dashboard instrumentation (deep ink surfaces, amber needle accent,
// tabular mono for figures) rather than a generic SaaS look.
export const tokens = {
  ink: "#12151B", // near-black instrument-panel background
  inkRaised: "#1B1F27", // raised panel surface on ink
  paper: "#F7F5F0", // warm paper background (light surfaces)
  paperRaised: "#FFFFFF",
  steel: "#5B6472", // secondary text / muted steel
  hairline: "#2A2F3A", // dividers on dark
  hairlineLight: "#E4E1D8",
  primary: "#22335F", // deep instrument blue
  primaryLight: "#3A4F8A",
  amber: "#F2A93B", // needle / accent amber
  amberDark: "#C9821E",
  signal: "#2F9E7A", // safety / positive signal green
  coral: "#E15B43", // difference / attention coral
};

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: tokens.paper,
      paper: tokens.paperRaised,
    },
    primary: {
      main: tokens.primary,
      light: tokens.primaryLight,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: tokens.amber,
      dark: tokens.amberDark,
      contrastText: tokens.ink,
    },
    success: {
      main: tokens.signal,
    },
    error: {
      main: tokens.coral,
    },
    text: {
      primary: tokens.ink,
      secondary: tokens.steel,
    },
    divider: tokens.hairlineLight,
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: "-0.01em" },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"Inter", sans-serif', fontWeight: 600, textTransform: "none" },
    overline: {
      fontFamily: '"JetBrains Mono", monospace',
      letterSpacing: "0.12em",
      fontWeight: 500,
    },
    caption: { fontFamily: '"Inter", sans-serif' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 20,
          paddingBlock: 10,
        },
        sizeLarge: {
          paddingInline: 28,
          paddingBlock: 14,
          fontSize: "1.02rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
