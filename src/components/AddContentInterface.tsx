import React, { useState } from "react";
import AddLocationButton from "./AddLocationButton";
import AddLocationModal from "./AddLocationModal";
import { useAuth } from "../contexts/AuthProvider";

interface AddContentInterfaceProps {
  contentClass: string;
  openAuthModal: Function;
  campusID: number;
}

export default function AddContentInterface({
  contentClass,
  openAuthModal,
  campusID,
}: AddContentInterfaceProps) {
  const [open, setOpen] = useState(false);
  const [countdownTo, setCountdownTo] = useState<null | Date>(null);
  const session = useAuth();
  const openAddContentModal = () => setOpen(true);
  const closeAddContentModal = () => setOpen(false);

  return (
    contentClass === "locations" && (
      <>
        <AddLocationButton
          openAuthModal={openAuthModal}
          openAddLocationModal={openAddContentModal}
        />
        <AddLocationModal
          open={open}
          closeAddLocationModal={closeAddContentModal}
          campusID={campusID}
          countdownTo={countdownTo}
          setCountdownTo={setCountdownTo}
        />
      </>
    )
  );
}
