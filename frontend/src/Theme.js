import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#283593" },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderRadius: "30px",
          paddingRight: "30px",
          paddingLeft: "30px",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;