import React from "react";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import { supabaseClient } from "../services/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { CircularProgress } from "@mui/material";
import ProfileButton from "./ProfileButton";

export default function Index() {
  const session = useSupabaseSession();

  return (
    <>
      {renderSwitch(session)}
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

function renderSwitch(session: Session | undefined | null) {
  switch (session) {
    case undefined:
      return <CircularProgress />;
      break;
    case null:
      return <AuthButtons supabaseClient={supabaseClient} />;
      break;
    default:
      return <ProfileButton color={"white"} scale={"2"} />;
      break;
  }
}
