import { createRoot } from "react-dom/client";
import React from "react";
import Index from "./components/Index";
import AuthProvider from "./contexts/AuthProvider";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./services/theme";

window.addEventListener("load", () => {
  const root = createRoot(document.querySelector(".container")!);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Index />
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  );
});
