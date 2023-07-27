import { createMuiTheme, createTheme } from "@mui/material";

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
});

export default theme;
