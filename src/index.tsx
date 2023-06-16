import { createRoot } from "react-dom/client";
import React from "react";
import Index from "./components/Index";

window.addEventListener("load", () => {
  const root = createRoot(document.querySelector(".container")!); // notice the '!'
  root.render(<Index />);
});
