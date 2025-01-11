import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TabProvider } from "./context/TabContext";

// Optimize theme creation
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <TabProvider>
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      </TabProvider>
    </Suspense>
  </React.StrictMode>
);
