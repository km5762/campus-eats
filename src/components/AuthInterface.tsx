import React from "react";
import { useState, useEffect } from "react";
import { Modal, Paper, Tooltip } from "@mui/material";
import { Button } from "@mui/base";
import { Session, SupabaseClient, createClient } from "@supabase/supabase-js";
import { form } from "../services/style";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import SignUpSuccessDialog from "./SignUpSuccessDialog";

interface AuthInterfaceProps {
  supabaseClient: SupabaseClient;
  open: boolean;
  openAuthModal: Function;
  closeAuthModal: Function;
}

export enum View {
  signIn,
  signUp,
  signUpSuccess,
}

export default function AuthInterface({
  supabaseClient,
  open,
  openAuthModal,
  closeAuthModal,
}: AuthInterfaceProps) {
  const [view, setView] = useState(View.signIn);

  return (
    <nav className="login-signup">
      <Tooltip title="Log in to add content!">
        <Button onClick={() => openAuthModal()} className="login">
          Log in
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => {
          closeAuthModal();
          setView(View.signIn);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper className="form-container" style={{ width: "300px" }}>
          {!(view === View.signUpSuccess) && (
            <a
              href="/"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <img
                src="/images/campus-eats-logo-black.svg"
                style={{ flex: "1", maxWidth: "75%" }}
              />
            </a>
          )}
          {view === View.signIn && <SignInForm setView={setView} />}
          {view === View.signUp && <SignUpForm setView={setView} />}
          {view === View.signUpSuccess && <SignUpSuccessDialog />}
        </Paper>
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
