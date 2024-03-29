import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import AddContentButton from "./AddContentButton";
import { add } from "lodash";
import { ContentClass } from "./ContentContainer";
import { TryPostResponse, insertDish, insertLocation } from "../services/api";
import AddLocationForm from "./AddLocationForm";
import { AddContentCountdownManagerProps } from "./AddContentCountdownManager";
import AddContentModal from "./AddContentModal";
import { useContentIDs } from "../contexts/ContentIDProvider";
import AddDishForm from "./AddDishForm";

interface AddContentInterfaceProps extends AddContentCountdownManagerProps {
  countdown: Date | null;
  setCountdown: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function AddContentInterface({
  contentClass,
  openAuthModal,
  countdown,
  setCountdown,
}: AddContentInterfaceProps) {
  const [open, setOpen] = useState(false);
  const campusID = useContentIDs().contentIDs.campusID;
  const locationID = useContentIDs().contentIDs.locationID;
  const session = useAuth();
  const openAddContentModal = () => setOpen(true);
  const closeAddContentModal = () => setOpen(false);

  return (
    <>
      {contentClass === "locations" && (
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
            countdown={countdown}
            setCountdown={setCountdown}
            contentClass={contentClass}
            insertData={async (formData: FormData) =>
              await insertLocation(
                formData.get("location-name")! as string,
                campusID
              )
            }
            AddContentForm={AddLocationForm}
          />
        </>
      )}
      {contentClass === "dishes" && (
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
            countdown={countdown}
            setCountdown={setCountdown}
            contentClass={contentClass}
            jwt={session?.access_token}
            insertData={insertDish}
            AddContentForm={AddDishForm}
          />
        </>
      )}
    </>
  );
}
