import { createMuiTheme, createTheme } from "@mui/material";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    verdict: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "Raleway",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },
  shape: {
    borderRadius: 15,
  },
});

export default theme;
