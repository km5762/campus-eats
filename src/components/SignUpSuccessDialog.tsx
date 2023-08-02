import { Typography } from "@mui/material";
import React from "react";

export default function SignUpSuccessDialog() {
  return (
    <>
      <Typography variant="h6" style={{ color: "var(--brand)" }}>
        Success!
      </Typography>
      <Typography>Check your email for a confirmation link</Typography>
    </>
  );
}
