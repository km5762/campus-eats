import { Backdrop, CircularProgress, Paper, Typography } from "@mui/material";
import React from "react";

export default function FormDialogModal({
  onClick,
  open,
  children,
}: {
  onClick?: Function;
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <Backdrop
      onClick={() => {
        if (onClick) onClick();
      }}
      style={{
        position: "absolute",
        backgroundColor: "rgb(255 255 255 / 25%)",
        backdropFilter: "blur(1px)",
        zIndex: "1300",
      }}
      open={open}
    >
      {children}
    </Backdrop>
  );
}
