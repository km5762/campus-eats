import React, { useEffect, useState } from "react";
import MiniSearchBar from "./MiniSearchBar";
import ContentContainer from "./ContentContainer";
import { LocationData } from "./LocationCard";
import AuthButtons from "./AuthButtons";
import { supabase } from "@supabase/auth-ui-shared";
import { Session, createClient } from "@supabase/supabase-js";
import { supabaseClient } from "../services/supabaseClient";
import { useSupabaseSession } from "../hooks/useSupabaseSession";

export default function SchoolPage({
  locations,
  campusName,
  campusID,
}: {
  locations: LocationData[];
  campusName: string;
  campusID: number;
}) {
  const session = useSupabaseSession();

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
            <MiniSearchBar placeholder={campusName}></MiniSearchBar>
          </div>
        </nav>
        <nav className="login-signup">
          <AuthButtons supabaseClient={supabaseClient} session={session} />
        </nav>
      </header>
      <section>
        <ContentContainer
          locations={locations}
          campusName={campusName}
          campusID={campusID}
        ></ContentContainer>
      </section>
    </>
  );
}
