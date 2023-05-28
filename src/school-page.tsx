import { createRoot } from "react-dom/client";
import React from "react";
import MiniSearchBar from "./components/MiniSearchBar";

window.addEventListener("load", () => {
  const root = createRoot(document.querySelector(".search-container")!); // notice the '!'
  root.render(<MiniSearchBar />);
});
