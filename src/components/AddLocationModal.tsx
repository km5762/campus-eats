import React, { useState } from "react";
import { Modal } from "@mui/material";
import "../styles/form.css";

export default function AddLocationModal({
  open,
  closeAddLocationModal,
}: {
  open: boolean;
  closeAddLocationModal: Function;
}) {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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
        <form action="" className="add-location" onSubmit={handleSubmit}>
          <h2>Add a location!</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label htmlFor="location-name">Location Name</label>
              <input id="location-name" type="text" />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </Modal>
  );
}
