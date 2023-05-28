import { createRoot } from "react-dom/client";
import React from "react";
import MiniSearchBar from "./components/MiniSearchBar";

window.addEventListener("load", () => {
  // const root = createRoot(document.querySelector(".search-container")!); // notice the '!'
  // root.render(<MiniSearchBar />);
  const root = createRoot(document.querySelector("body")!); // notice the '!'
  root.render(
    <>
      <header>
        <picture title="Campus Eats">
          <source
            media="(min-width: 400px)"
            srcSet="../../images/campus-eats-logo-black.svg"
          />
          <img
            src="../../images/campus-eats-logo-mini.svg"
            alt="campus-eats-logo"
          />
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
        <div className="locations">
          <div className="location">
            <span>Morgan Dining Hall</span>
            <span>
              <em>See all 50 dishes</em>
            </span>
          </div>
        </div>
      </section>
    </>
  );
});
