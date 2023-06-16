import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { Button } from "@mui/base";
import { Session, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByYWF1bm50cmFxendvbWlrbGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1NDAzODMsImV4cCI6MjAwMDExNjM4M30
    .iy7rGNKGQ5HeK0xJhKN3OzXqbNnegkVVAic7rWZ - iXU`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AuthButtons() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} className="login">
        Log in
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div className="auth-container">
          <a href="/">
            <img src="/images/campus-eats-logo-black.svg" />
          </a>
          <Auth supabaseClient={supabase} appearance={authAppearence} />
        </div>
      </Modal>
    </>
  );
}

const authAppearence = {
  theme: {
    default: {
      colors: {
        brand: "#6184d8",
        brandAccent: "#6185d8b2",
        brandButtonText: "white",
        defaultButtonBackground: "white",
        defaultButtonBackgroundHover: "#eaeaea",
        defaultButtonBorder: "lightgray",
        defaultButtonText: "#333333",
        dividerBackground: "#e5e5e5",
        inputBorder: "#e5e5e5",
        inputBorderHover: "#4d4d4d",
        inputBorderFocus: "#4d4d4d",
        inputText: "#333333",
        inputLabelText: "#333333",
        inputPlaceholder: "#4d4d4d",
        messageText: "gray",
        messageTextDanger: "red",
        anchorTextColor: "gray",
        anchorTextHoverColor: "darkgray",
      },
      fonts: {
        bodyFontFamily: `Raleway`,
        buttonFontFamily: `Raleway`,
        inputFontFamily: `Raleway`,
        labelFontFamily: `Raleway`,
      },
      fontSizes: {
        baseBodySize: "13px",
        baseInputSize: "16px",
        baseLabelSize: "14px",
        baseButtonSize: "14px",
      },
      radii: {
        borderRadiusButton: "15px",
        buttonBorderRadius: "15px",
        inputBorderRadius: "5px",
      },
      space: {
        inputPadding: "10px",
        buttonPadding: "10px",
      },
      borderWidths: {
        buttonBorderWidth: "1px",
        inputBorderWidth: "1px",
      },
    },
  },
  style: {
    container: { backgroundColor: "white" },
    input: { backgroundColor: "#f2f2f2" },
  },
};
