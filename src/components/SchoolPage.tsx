import React, { useState } from "react";
import ContentContainer from "./ContentContainer";
import { LocationData } from "./LocationCard";
import AuthInterface from "./AuthInterface";
import { supabaseClient } from "../services/supabaseClient";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import SearchBar from "./SearchBar";
import { CircularProgress } from "@mui/material";
import ProfileButton from "./ProfileButton";
import { useAuth } from "../contexts/AuthProvider";
import ContentIDProvider, {
  useContentIDs,
} from "../contexts/ContentIDProvider";
import ProfileInterface from "./ProfileInterface";

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
  const openAuthModal = () => setOpen(true);
  const closeAuthModal = () => setOpen(false);

  function renderAuthSwitch() {
    switch (session) {
      case undefined:
        return <CircularProgress />;
        break;
      case null:
        return (
          <AuthInterface
            supabaseClient={supabaseClient}
            openAuthModal={openAuthModal}
            closeAuthModal={closeAuthModal}
            open={open}
          />
        );
        break;
      default:
        return <ProfileInterface size={40} closeAuthModal={closeAuthModal} />;
        break;
    }
  }

  return (
    <ContentIDProvider campusID={campusID}>
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
          openAuthModal={openAuthModal}
          closeAuthModal={closeAuthModal}
        ></ContentContainer>
      </section>
    </ContentIDProvider>
  );
}
