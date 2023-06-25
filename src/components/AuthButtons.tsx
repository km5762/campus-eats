import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { Button } from "@mui/base";
import { Session, SupabaseClient, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { form } from "../services/style";

interface AuthButtonsProps {
  supabaseClient: SupabaseClient;
  open: boolean;
  openAuthModal: Function;
  closeAuthModal: Function;
}

export default function AuthButtons({
  supabaseClient,
  open,
  openAuthModal,
  closeAuthModal,
}: AuthButtonsProps) {
  return (
    <nav className="login-signup">
      <Button onClick={() => openAuthModal()} className="login">
        Log in
      </Button>
      <Modal
        open={open}
        onClose={() => closeAuthModal()}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="auth-container">
          <a href="/">
            <img src="/images/campus-eats-logo-black.svg" />
          </a>
          <Auth
            supabaseClient={supabaseClient}
            appearance={authAppearence}
            providers={["google", "facebook", "twitter"]}
          />
        </div>
      </Modal>
    </nav>
  );
}

const authAppearence = {
  theme: {
    default: {
      colors: {
        ...form,
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
