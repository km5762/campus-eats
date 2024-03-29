import React, { useEffect, useState } from "react";
import { CircularProgress, Modal, Paper } from "@mui/material";
import "../styles/form.css";
import { TryPostResponse, insertLocation } from "../services/api";
import { PostgrestError } from "@supabase/supabase-js";
import Countdown from "react-countdown";
import { Construction } from "@mui/icons-material";
import { ContentClass } from "./ContentContainer";
import FormDialogModal from "./FormDialogModal";

const contentClassMap: { [key: string]: string } = {
  locations: "location",
  dishes: "dish",
};

export interface AddContentModalProps {
  open: boolean;
  closeAddContentModal: Function;
  campusID: number;
  countdown: null | Date;
  setCountdown: Function;
  contentClass: ContentClass;
  AddContentForm: React.FC<{ loading: boolean }>;
  jwt?: string;
  insertData: (formData: FormData, jwt?: string) => Promise<TryPostResponse>;
}

export default function AddContentModal({
  open,
  closeAddContentModal,
  countdown,
  setCountdown,
  contentClass,
  AddContentForm,
  jwt,
  insertData,
}: AddContentModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const contentType = contentClassMap[contentClass];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    setLoading(true);
    const { successful, nextPostAt } = jwt
      ? await insertData(formData, jwt)
      : await insertData(formData);
    setLoading(false);
    setSubmitted(successful);
    setCountdown(nextPostAt);
  }

  return (
    <Modal
      disableScrollLock={true}
      open={open}
      onClose={() => {
        if (submitted) setSubmitted(false);
        closeAddContentModal();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      {(() => {
        if (countdown && new Date() < countdown && !submitted) {
          return (
            <div className="timeout-error">
              <h2>Slow down!</h2>
              <hr />
              <p>
                Please wait{" "}
                <Countdown
                  date={countdown}
                  onComplete={() => setCountdown(null)}
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
                After your request has been reviewed by a moderator, your{" "}
                {contentType} will be added.
              </p>
            </div>
          );
        } else {
          return (
            <Paper
              className="form-container"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <FormDialogModal open={loading}>
                <CircularProgress />
              </FormDialogModal>
              <form
                action="/api/dishes"
                method="post"
                encType="multipart/form-data"
                className={`add-content`}
                onSubmit={handleSubmit}
              >
                <AddContentForm loading={loading} />
              </form>
            </Paper>
          );
        }
      })()}
    </Modal>
  );
}
