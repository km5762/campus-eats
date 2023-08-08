import React, { useState } from "react";
import "../styles/form.css";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  Modal,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { insertReview } from "../services/api";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import { useContentIDs } from "../contexts/ContentIDProvider";

export default function AddReviewForm({
  setIsWritingReview,
}: {
  setIsWritingReview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [verdict, setVerdict] = useState("");
  const [comments, setComments] = useState("");
  const session = useSupabaseSession();
  const dishID = useContentIDs().contentIDs.dishID;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    setOpen(true);
    setLoading(true);
    const res = await insertReview(formData, session?.access_token);
    setLoading(false);

    if (res.ok) {
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper style={{ padding: "1rem" }}>
          <Backdrop
            onClick={() => {
              if (!loading) {
                setOpen(false);
                setIsWritingReview(false);
              }
            }}
            style={{
              position: "absolute",
              backgroundColor: "rgb(255 255 255 / 25%)",
              backdropFilter: "blur(1px)",
              zIndex: "1300",
            }}
            open={open}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Paper style={{ padding: "1rem" }}>
                <Typography variant="h6" style={{ color: "var(--brand)" }}>
                  Success!
                </Typography>
                <Typography>Your review has been posted.</Typography>
              </Paper>
            )}
          </Backdrop>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label>
                Verdict (max 100 char.)
                <input
                  type="text"
                  placeholder='What do you want people to take away? (E.g. "Would not buy again", "Pleasantly suprised")'
                  maxLength={100}
                  onChange={(event) => setVerdict(event.target.value)}
                  name="review-verdict"
                  required
                />
                <span>{`${verdict.length}/100`}</span>
              </label>
            </div>
            <div>
              <label>
                Comments (max 500 char.)
                <textarea
                  style={{ resize: "none" }}
                  maxLength={500}
                  onChange={(event) => setComments(event.target.value)}
                  rows={8}
                  name="review-comments"
                  required
                />
                <span>{`${comments.length}/500`}</span>
              </label>
            </div>
            <label>
              Image
              <input type="file" name="content-image" />
            </label>
            <label style={{ alignItems: "flex-start" }}>
              Rating
              <Rating
                precision={0.25}
                sx={{ fontSize: "2rem" }}
                name="review-rating"
              />
            </label>
          </div>
        </Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "0.75rem",
            gap: "0.75rem",
          }}
        >
          <button
            type="button"
            className="cancel"
            onClick={() => setIsWritingReview(false)}
          >
            Cancel
          </button>
          <input type="hidden" name="dish-id" value={dishID} />
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
