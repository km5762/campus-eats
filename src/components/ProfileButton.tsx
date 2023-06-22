import React from "react";
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function ProfileButton({
  color,
  scale,
}: {
  color: string;
  scale: string;
}) {
  return (
    <nav className="profile">
      <IconButton sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <AccountCircle
          sx={{
            transform: `scale(${scale})`,
            color: color,
          }}
        />
      </IconButton>
    </nav>
  );
}
