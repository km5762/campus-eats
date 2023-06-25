import React, { useState } from "react";
import AddLocationButton from "./AddLocationButton";
import AddLocationModal from "./AddLocationModal";
import { useAuth } from "../contexts/AuthProvider";

export default function AddLocationInterface({
  openAuthModal,
}: {
  openAuthModal: Function;
}) {
  const [open, setOpen] = useState(false);
  const session = useAuth();
  const openAddLocationModal = () => setOpen(true);
  const closeAddLocationModal = () => setOpen(false);

  return (
    <>
      <AddLocationButton
        openAuthModal={openAuthModal}
        openAddLocationModal={openAddLocationModal}
      />
      <AddLocationModal
        open={open}
        closeAddLocationModal={closeAddLocationModal}
      />
    </>
  );
}
