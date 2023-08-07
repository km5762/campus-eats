import React, { useState } from "react";
import "../styles/form.css";
import { Paper, Rating } from "@mui/material";

export default function AddReviewForm({
  setIsWritingReview,
}: {
  setIsWritingReview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [verdict, setVerdict] = useState("");
  const [comments, setComments] = useState("");

  return (
    <>
      <form>
        <Paper style={{ padding: "1rem" }}>
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
                  required
                />
                <span>{`${comments.length}/500`}</span>
              </label>
            </div>
            <label>
              Image
              <input type="file" />
            </label>
            <label style={{ alignItems: "flex-start" }}>
              Rating
              <Rating precision={0.25} sx={{ fontSize: "2rem" }} />
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
