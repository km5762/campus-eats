import React, { useState } from "react";
import { ContentClass } from "./ContentContainer";
import AddContentInterface from "./AddContentInterface";
import { useContentIDs } from "../contexts/ContentIDProvider";

export interface AddContentCountdownManagerProps {
  contentClass: ContentClass;
  openAuthModal: Function;
}
export default function AddContentCountdownManager({
  contentClass,
  openAuthModal,
}: AddContentCountdownManagerProps) {
  const [addLocationCountdown, setAddLocationCountdown] = useState<Date | null>(
    null
  );
  const [addDishCountdown, setAddDishCountdown] = useState<Date | null>(null);
  return (
    <>
      {contentClass === "locations" && (
        <AddContentInterface
          countdown={addLocationCountdown}
          setCountdown={setAddLocationCountdown}
          contentClass={contentClass}
          openAuthModal={openAuthModal}
        />
      )}
      {contentClass === "dishes" && (
        <AddContentInterface
          countdown={addDishCountdown}
          setCountdown={setAddDishCountdown}
          contentClass={contentClass}
          openAuthModal={openAuthModal}
        />
      )}
    </>
  );
}
