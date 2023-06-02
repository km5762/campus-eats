import React from "react";
import MiniSearchBar from "./MiniSearchBar";
import ContentContainer from "./ContentContainer";
import { Location } from "./ContentContainer";

export default function SchoolPage({ locations }: { locations: Location[] }) {
  return (
    <>
      <header>
        <picture title="Campus Eats">
          <source
            media="(min-width: 400px)"
            srcSet="/images/campus-eats-logo-black.svg"
          />
          <img src="/images/campus-eats-logo-mini.svg" alt="campus-eats-logo" />
        </picture>
        <nav className="places-at">
          <h2>Places</h2>
          <h2>at</h2>
          <div className="search-container">
            <MiniSearchBar></MiniSearchBar>
          </div>
        </nav>
        <nav className="login-signup">
          <button className="login">Log in</button>
          <button className="signup">Sign up</button>
        </nav>
      </header>
      <section>
        <ContentContainer locations={locations}></ContentContainer>
      </section>
    </>
  );
}
