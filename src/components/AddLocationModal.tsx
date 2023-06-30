import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import "../styles/form.css";
import { insertLocation } from "../services/api";
import { PostgrestError } from "@supabase/supabase-js";
import Countdown from "react-countdown";
import { Construction } from "@mui/icons-material";

interface AddLocationModalProps {
  open: boolean;
  closeAddLocationModal: Function;
  campusID: number;
  countdownTo: null | Date;
  setCountdownTo: Function;
}

export default function AddLocationModal({
  open,
  closeAddLocationModal,
  campusID,
  countdownTo,
  setCountdownTo,
}: AddLocationModalProps) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const { successful, nextPostTime } = await insertLocation(
      formData.get("location-name")! as string,
      campusID
    );

    setSubmitted(successful);
    setCountdownTo(new Date(nextPostTime));
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        if (submitted) setSubmitted(false);
        closeAddLocationModal();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      {(() => {
        if (countdownTo && new Date() < countdownTo && !submitted) {
          return (
            <div className="timeout-error">
              <h2>Slow down!</h2>
              <hr />
              <p>
                Please wait{" "}
                <Countdown
                  date={countdownTo}
                  onComplete={() => setCountdownTo(null)}
                />{" "}
                minutes before making another request.
              </p>
            </div>
          );
        } else if (submitted) {
          return (
            <div className="thank-you">
              <h2>
                Thank you for helping to make CampusEats a better website!
              </h2>
              <hr />
              <p>
                After your request has been reviewed by a moderator, your
                location will be added.
              </p>
            </div>
          );
        } else {
          return (
            <form
              method="post"
              className="add-location"
              onSubmit={handleSubmit}
            >
              <h2>Add a location!</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
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
          );
        }
      })()}
    </Modal>
  );
}
