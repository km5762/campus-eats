import React, { useState } from "react";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import { supabaseClient } from "../services/supabaseClient";
import { CircularProgress } from "@mui/material";
import ProfileButton from "./ProfileButton";
import { useAuth } from "../contexts/AuthProvider";

export default function Index() {
  const session = useAuth();
  const [open, setOpen] = useState(false);
  const openAuthModal = () => setOpen(true);
  const closeAuthModal = () => setOpen(false);

  function renderAuthSwitch() {
    switch (session) {
      case undefined:
        return <CircularProgress />;
        break;
      case null:
        return (
          <AuthButtons
            supabaseClient={supabaseClient}
            openAuthModal={openAuthModal}
            closeAuthModal={closeAuthModal}
            open={open}
          />
        );
        break;
      default:
        return <ProfileButton color={"white"} scale={"2"} />;
        break;
    }
  }

  return (
    <>
      {renderAuthSwitch()}
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
