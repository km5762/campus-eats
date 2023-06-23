import React, { useState } from "react";
import ContentContainer from "./ContentContainer";
import { LocationData } from "./LocationCard";
import AuthButtons from "./AuthButtons";
import { supabaseClient } from "../services/supabaseClient";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import SearchBar from "./SearchBar";
import { CircularProgress } from "@mui/material";
import ProfileButton from "./ProfileButton";
import { useAuth } from "../contexts/AuthProvider";

export default function SchoolPage({
  locations,
  campusName,
  campusID,
}: {
  locations: LocationData[];
  campusName: string;
  campusID: number;
}) {
  const session = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function renderAuthSwitch() {
    switch (session) {
      case undefined:
        return <CircularProgress />;
        break;
      case null:
        return (
          <AuthButtons
            supabaseClient={supabaseClient}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
          />
        );
        break;
      default:
        return <ProfileButton color={"#6184d8"} scale={"1.5"} />;
        break;
    }
  }

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
          <div className="search-container">
            <SearchBar />
          </div>
        </nav>
        {renderAuthSwitch()}
      </header>
      <section>
        <ContentContainer
          locations={locations}
          campusName={campusName}
          campusID={campusID}
          handleOpen={handleOpen}
          handleClose={handleClose}
        ></ContentContainer>
      </section>
    </>
  );
}
