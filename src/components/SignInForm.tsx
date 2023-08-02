import React, { useState, forwardRef, ForwardedRef } from "react";
import { supabaseClient } from "../services/supabaseClient";
import { Modal } from "@mui/material";
import "../styles/form.css";
import { View } from "./AuthInterface";

interface SignInFormProps {
  setView: React.Dispatch<React.SetStateAction<View>>;
}

export default function SignInForm({ setView }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  const switchView = () => setView(View.signUp);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>
        <label>
          Email
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <div style={{ height: "12px" }}>
          <span className="error-message">{error}</span>
        </div>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </button>
      <hr />

      <button type="button" className="switch-view" onClick={switchView}>
        Don't have an account? Sign up!
      </button>
    </form>
  );
}
