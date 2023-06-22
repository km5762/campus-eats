import React from "react";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import { supabaseClient } from "../services/supabaseClient";

export default function Index() {
  const session = useSupabaseSession();

  return (
    <>
      <nav className="login-signup">
        <AuthButtons supabaseClient={supabaseClient} session={session} />
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
