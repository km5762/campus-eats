import React from "react";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Session } from "@supabase/supabase-js";
import { useAuth } from "../contexts/AuthProvider";

export default function AddLocationButton({
  handleOpen,
  handleClose,
}: {
  handleOpen: Function;
  handleClose: Function;
}) {
  const session = useAuth();
  return (
    <IconButton
      onClick={() => handleOpen()}
      disableTouchRipple={true}
      sx={{
        borderRadius: "15px",
        font: "inherit",
        width: "100%",
        padding: "10px 0px 10px 0px",
      }}
    >
      <Add sx={{ color: "#6184d8" }} />
      {session ? "Add a location" : "Sign in to add a location!"}
    </IconButton>
  );
}
