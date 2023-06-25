import React from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthProvider";
import { form } from "../services/style";

export default function AddLocationButton({
  openAuthModal,
  openAddLocationModal,
}: {
  openAuthModal: Function;
  openAddLocationModal: Function;
}) {
  const session = useAuth();

  switch (session) {
    case undefined:
      return <CircularProgress />;
    case null:
      return (
        <span
          style={{
            marginTop: "0.75rem",
            flexWrap: "wrap",
            fontSize: "0.75rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Don't see a location?
          <button
            className="add-location-sign-in"
            onClick={() => openAuthModal()}
          >
            Sign in to request it to be added!
          </button>
        </span>
      );
    default:
      return (
        <IconButton
          onClick={() => openAddLocationModal()}
          disableTouchRipple={true}
          sx={{
            borderRadius: "15px",
            font: "inherit",
            width: "100%",
            padding: "10px 0px 10px 0px",
          }}
        >
          <Add sx={{ color: "#6184d8" }} />
          Add a location!
        </IconButton>
      );
  }
}
