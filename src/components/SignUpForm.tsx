import React, { useState, forwardRef, ForwardedRef, useEffect } from "react";
import { supabaseClient } from "../services/supabaseClient";
import { Modal } from "@mui/material";
import "../styles/form.css";
import { View } from "./AuthInterface";

interface SignUpFormProps {
  setView: React.Dispatch<React.SetStateAction<View>>;
}

export default function SignUpForm({ setView }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!/^[A-Za-z0-9_]{3,20}$/.test(username) && username) {
      setError(
        "Username invalid, must be at least 3 characters and only contain letters, underscores, and numbers."
      );
    } else if (password !== confirmPassword && confirmPassword) {
      setError("Passwords do not match");
    } else if (password.length < 6 && password) {
      setError("Password must be at least 6 characters");
    } else {
      setError("");
    }
  }, [password, confirmPassword, username]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!error) {
      setLoading(true);

      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        setLoading(false);
        if (
          error.message ===
          `duplicate key value violates unique constraint "profile_username_key"`
        ) {
          setError("Sorry, that username is already taken.");
        } else {
          setError(error.message);
        }
      } else {
        setView(View.signUpSuccess);
      }
    }
  }

  const switchView = () => setView(View.signIn);

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
          Username
          <input
            id="username-input"
            type="text"
            maxLength={20}
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
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
      </div>
      <div>
        <label>
          Confirm Password
          <input
            id="confirm-password-input"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>
        <div style={{ height: "48px" }}>
          {<span className="error-message">{error}</span>}
        </div>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      <hr />
      <button type="button" className="switch-view" onClick={switchView}>
        Already have an account? Sign in!
      </button>
    </form>
  );
}
