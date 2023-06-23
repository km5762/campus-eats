import React from "react";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Session } from "@supabase/supabase-js";

export default function AddLocationButton({
  handleOpen,
  handleClose,
  session,
}: {
  handleOpen: Function;
  handleClose: Function;
  session: Session | null | undefined;
}) {
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
      Add a location
    </IconButton>
  );
}
