import { createMuiTheme, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Raleway",
    button: {
      textTransform: "none",
    },
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
