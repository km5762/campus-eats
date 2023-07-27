import { IconButton, Modal, Paper, Typography } from "@mui/material";
import React from "react";
import { useContentIDs } from "../contexts/ContentIDProvider";
import { queryCache } from "../services/cache";
import { Close } from "@mui/icons-material";

export default function ReviewsModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dishID = useContentIDs().contentIDs.dishID;
  const locationID = useContentIDs().contentIDs.locationID;
  const name = (queryCache(`location.${locationID}`) as any[]).find(
    (dish) => dish.id === dishID
  ).name;

  return (
    <Modal
      disableScrollLock={true}
      onClose={() => setOpen(false)}
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper sx={{ height: "80vh" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <IconButton>
            <Close />
          </IconButton>
        </div>
        <Typography variant={"h5"}>Reviews for {name!}</Typography>
      </Paper>
    </Modal>
  );
}
