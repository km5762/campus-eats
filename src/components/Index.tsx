import React from "react";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";

export default function Index() {
  return (
    <>
      <nav className="login-signup">
        <AuthButtons />
      </nav>
      <div className="main-content">
        <img
          className="logo"
          src="./images/campus-eats-logo.svg"
          alt="campus-eats-logo"
        />
        <p>Campus Dining - Done Smarter.</p>
        <div className="search-container">
          <SearchBar />
        </div>
      </div>
    </>
  );
}
