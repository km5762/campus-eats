import { createRoot, hydrateRoot } from "react-dom/client";
import React from "react";
import MiniSearchBar from "./components/MiniSearchBar";
import ContentContainer from "./components/ContentContainer";
import SchoolPage from "./components/SchoolPage";
import { renderToString } from "react-dom/server";
import { fetchLocations } from "./services/api";

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

const root = document.querySelector("#root") as Element;
hydrateRoot(
  root,
  <SchoolPage
    locations={window.__INITIAL_STATE__.data}
    campusName={document.title}
    campusID={window.__INITIAL_STATE__.id}
  />
);
