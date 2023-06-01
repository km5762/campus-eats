import { createRoot, hydrateRoot } from "react-dom/client";
import React from "react";
import MiniSearchBar from "./components/MiniSearchBar";
import ContentContainer from "./components/ContentContainer";
import SchoolPage from "./components/SchoolPage";
import { renderToString } from "react-dom/server";

const root = document.querySelector("#root") as Element;
hydrateRoot(root, <SchoolPage />);
console.log("Success");
