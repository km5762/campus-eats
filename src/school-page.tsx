import { hydrateRoot } from "react-dom/client";
import React from "react";
import SchoolPage from "./components/SchoolPage";
import AuthProvider from "./contexts/AuthProvider";
import ContentIDProvider from "./contexts/ContentIDProvider";

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

const root = document.querySelector("#root") as Element;
hydrateRoot(
  root,
  <React.StrictMode>
    <AuthProvider>
      <ContentIDProvider campusID={window.__INITIAL_STATE__.id}>
        <SchoolPage
          locations={window.__INITIAL_STATE__.data}
          campusName={document.title}
          campusID={window.__INITIAL_STATE__.id}
        />
      </ContentIDProvider>
    </AuthProvider>
  </React.StrictMode>
);
