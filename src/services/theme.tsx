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
  shape: {
    borderRadius: 15,
  },
});

export default theme;
