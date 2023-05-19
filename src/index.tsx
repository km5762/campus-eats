import { createRoot } from "react-dom/client";
import React from "react";
import SearchBar from "./components/SearchBar";

window.addEventListener("load", () => {
  console.log("TEST");
  const root = createRoot(document.querySelector(".search-container")!); // notice the '!'
  console.log("SUCCESS");
  const element = <h1>HIIIsssswejfwnk</h1>;

  root.render(element);
});
