import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import AddContentButton from "./AddContentButton";
import { add } from "lodash";
import { ContentClass } from "./ContentContainer";
import {
  InsertDataResponse,
  insertDish,
  insertLocation,
} from "../services/api";
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

  async function parseDishForm(formData: FormData) {
    const name = formData.get("dish-name")! as string;
    const price = formData.get("dish-price")! as unknown as number;
    const breakfast = !!formData.get("dish-breakfast?");
    const lunch = !!formData.get("dish-lunch?");
    const dinner = !!formData.get("dish-dinner?");
    const img = formData.get("dish-img") as File;

    return await insertDish(
      name,
      locationID,
      price,
      breakfast,
      lunch,
      dinner,
      img
    );
  }

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
            insertData={parseDishForm}
            AddContentForm={AddDishForm}
          />
        </>
      )}
    </>
  );
}
