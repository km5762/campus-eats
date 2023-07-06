import React, { useState } from "react";
import { ContentClass } from "./ContentContainer";
import AddContentInterface from "./AddContentInterface";

export interface AddContentCountdownManagerProps {
  contentClass: ContentClass;
  openAuthModal: Function;
  campusID: number;
}
export default function AddContentCountdownManager({
  contentClass,
  openAuthModal,
  campusID,
}: AddContentCountdownManagerProps) {
  const [addLocationCountdown, setAddLocationCountdown] = useState<Date | null>(
    null
  );

  return (
    contentClass === "locations" && (
      <AddContentInterface
        countdown={addLocationCountdown}
        setCountdown={setAddLocationCountdown}
        contentClass={"locations"}
        openAuthModal={openAuthModal}
        campusID={campusID}
      />
    )
  );
}
