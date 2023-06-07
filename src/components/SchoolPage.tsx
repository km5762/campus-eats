import React from "react";
import MiniSearchBar from "./MiniSearchBar";
import ContentContainer, { LocationCard } from "./ContentContainer";
import { LocationData } from "./ContentContainer";
import { BrowserRouter } from "react-router-dom";

export default function SchoolPage({
  locations,
  name,
}: {
  locations: LocationData[];
  name: string;
}) {
  return (
    <>
      <header>
        <a href="/">
          <picture title="Campus Eats">
            <source
              media="(min-width: 400px)"
              srcSet="/images/campus-eats-logo-black.svg"
            />
            <img
              src="/images/campus-eats-logo-mini.svg"
              alt="campus-eats-logo"
            />
          </picture>
        </a>
        <nav className="places-at">
          <h2>Places</h2>
          <h2>at</h2>
          <div className="search-container">
            <MiniSearchBar placeholder={name}></MiniSearchBar>
          </div>
        </nav>
        <nav className="login-signup">
          <button className="login">Log in</button>
          <button className="signup">Sign up</button>
        </nav>
      </header>
      <section>
        <BrowserRouter>
          <ContentContainer
            cardData={locations}
            className="locations"
          ></ContentContainer>
        </BrowserRouter>
      </section>
    </>
  );
}
