import { createRoot } from "react-dom/client";
import React from "react";
import SearchBar from "./components/SearchBar";

window.addEventListener("load", () => {
  const root = createRoot(document.querySelector(".search-container")!); // notice the '!'
  root.render(<SearchBar />);
});
