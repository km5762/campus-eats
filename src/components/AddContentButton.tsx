import React from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthProvider";
import { form } from "../services/style";

interface AddContentButtonText {
  signInMessage: string;
  signInLink: string;
  buttonText: string;
}

const contentClassMap: { [key: string]: AddContentButtonText } = {
  locations: {
    signInMessage: `Don't see a location?`,
    signInLink: "Sign in to request it to be added!",
    buttonText: "Add a location!",
  },
  dishes: {
    signInMessage: `Don't see a dish?`,
    signInLink: "Sign in to request it to be added!",
    buttonText: "Add a dish!",
  },
  reviews: {
    signInMessage: "Want to join the conversation?",
    signInLink: "Sign in to add a review!",
    buttonText: "Add a review!",
  },
};

export default function AddContentButton({
  openAuthModal,
  openAddContentModal,
  contentClass,
}: {
  openAuthModal: Function;
  openAddContentModal: Function;
  contentClass: string;
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
          {contentClassMap[contentClass].signInMessage}
          <button
            className={`add-content-sign-in`}
            onClick={() => openAuthModal()}
          >
            {contentClassMap[contentClass].signInLink}
          </button>
        </span>
      );
    default:
      return (
        <IconButton
          onClick={() => openAddContentModal()}
          disableTouchRipple={true}
          sx={{
            borderRadius: "15px",
            font: "inherit",
            width: "100%",
            padding: "10px 0px 10px 0px",
          }}
        >
          <Add sx={{ color: "#6184d8" }} />
          {contentClassMap[contentClass].buttonText}
        </IconButton>
      );
  }
}
