import { createRoot } from "react-dom/client";
import React from "react";
import Index from "./components/Index";
import AuthProvider from "./contexts/AuthProvider";

window.addEventListener("load", () => {
  const root = createRoot(document.querySelector(".container")!);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </React.StrictMode>
  );
});
