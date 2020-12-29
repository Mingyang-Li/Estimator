import { createMuiTheme } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#29b329",
    },
    secondary: {
      main: "#c1c4c0",
    },
    textColor: {
      main: "#ffffff",
    },
  },
});

export default theme;
