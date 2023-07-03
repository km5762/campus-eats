import React, { useState } from "react";
import AddLocationModal from "./AddLocationModal";
import { useAuth } from "../contexts/AuthProvider";
import AddContentButton from "./AddContentButton";

interface AddContentInterfaceProps {
  contentClass: string;
  openAuthModal: Function;
  campusID: number;
  AddContentModal: any;
}

export default function AddContentInterface({
  contentClass,
  openAuthModal,
  campusID,
  AddContentModal,
}: AddContentInterfaceProps) {
  const [open, setOpen] = useState(false);
  const [countdownTo, setCountdownTo] = useState<null | Date>(null);
  const session = useAuth();
  const openAddContentModal = () => setOpen(true);
  const closeAddContentModal = () => setOpen(false);

  return (
    <>
      <AddContentButton
        openAuthModal={openAuthModal}
        openAddContentModal={openAddContentModal}
        contentClass={contentClass}
      />
      <AddContentModal
        open={open}
        closeAddContentModal={closeAddContentModal}
        campusID={campusID}
        countdownTo={countdownTo}
        setCountdownTo={setCountdownTo}
      />
    </>
  );
}
