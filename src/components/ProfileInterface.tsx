import React, { useRef, useState } from "react";
import ProfileButton from "./ProfileButton";
import { ListItemText, ListItemIcon, MenuItem } from "@mui/material";
import { MenuList } from "@mui/material";
import { ClickAwayListener, Menu } from "@mui/base";
import { IconButton } from "@mui/material";
import { Popper } from "@mui/base";
import { AccountCircle, Logout } from "@mui/icons-material";
import { supabaseClient } from "../services/supabaseClient";
import { PersonOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { size } from "lodash";
import Avatar from "boring-avatars";
import { useAuth } from "../contexts/AuthProvider";

export default function ProfileInterface({
  size,
  closeAuthModal,
}: {
  size: number;
  closeAuthModal: Function;
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const session = useAuth();
  return (
    <>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <nav className="profile">
          <IconButton
            sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            onClick={() => setOpen(!open)}
            ref={anchorRef}
            disableTouchRipple={true}
          >
            <Avatar
              size={size}
              name={session?.user.user_metadata["username"]}
              variant="beam"
            />
          </IconButton>
        </nav>
      </ClickAwayListener>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start">
        <MenuList sx={{ marginTop: "1rem" }}>
          <MenuItem disableTouchRipple={true}>
            <ListItemIcon>
              <PersonOutline sx={{ scale: "0.75" }} />
            </ListItemIcon>
            <ListItemText sx={{ fontSize: "0.75rem" }} primary="My Profile" />
          </MenuItem>
          <MenuItem
            disableTouchRipple={true}
            onClick={() => {
              supabaseClient.auth.signOut();
              closeAuthModal();
            }}
          >
            <ListItemIcon>
              <Logout sx={{ scale: "0.75" }} />
            </ListItemIcon>
            <ListItemText sx={{ fontSize: "0.75rem" }} primary="Log Out" />
          </MenuItem>
        </MenuList>
      </Popper>
    </>
  );
}
