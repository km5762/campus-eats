import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { Button } from "@mui/base";
import { Session, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
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
      <Button className="signup">Sign up</Button>
      <Modal open={open} onClose={handleClose}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </Modal>
    </>
  );
}
