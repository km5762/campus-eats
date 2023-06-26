import React, { useState } from "react";
import { Modal } from "@mui/material";
import "../styles/form.css";
import { insertLocation } from "../services/api";

export default function AddLocationModal({
  open,
  closeAddLocationModal,
  campusID,
}: {
  open: boolean;
  closeAddLocationModal: Function;
  campusID: number;
}) {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    insertLocation(formData.get("location-name")! as string, campusID);

    setSubmitted(true);
  }
  return (
    <Modal
      open={open}
      onClose={() => {
        if (submitted) {
          setSubmitted(false);
        }
        closeAddLocationModal();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      {submitted ? (
        <div className="thank-you">
          <h2>Thank you for helping to make CampusEats a better website!</h2>
          <hr />
          <p>
            After your request has been reviewed by a moderator, your location
            will be added.
          </p>
        </div>
      ) : (
        <form method="post" className="add-location" onSubmit={handleSubmit}>
          <h2>Add a location!</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label htmlFor="location-name-input">Location Name</label>
              <input
                type="text"
                id="location-name-input"
                name="location-name"
                required
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </Modal>
  );
}
