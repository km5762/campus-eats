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
import { CacheQuery, appendCacheEntry, queryCache } from "../services/cache";
import { ReviewData } from "./ReviewCard";
import FormDialogModal from "./FormDialogModal";

interface ErrorMessage {
  header: string;
  message: string;
}

export default function AddReviewForm({
  setIsWritingReview,
  setReviewData,
}: {
  setIsWritingReview: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewData: React.Dispatch<React.SetStateAction<ReviewData[]>>;
}) {
  const [verdict, setVerdict] = useState("");
  const [comments, setComments] = useState("");
  const session = useSupabaseSession();
  const dishID = useContentIDs().contentIDs.dishID;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [fileError, setFileError] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (fileError) {
      return;
    }

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    setOpen(true);
    setLoading(true);
    const res = await insertReview(formData, session?.access_token);
    setLoading(false);
    const json = await res.json();

    if (res.ok) {
      const username = session?.user.user_metadata["username"];

      const newReviewData: ReviewData = {
        id: json.newRow,
        verdict: verdict,
        comments: comments,
        rating: rating ?? 0,
        image: json.newImage,
        likes: 0,
        dislikes: 0,
        username: username,
        createdAt: new Date(),
      };

      const cacheQuery: CacheQuery = `dish.${dishID}`;
      appendCacheEntry(cacheQuery, newReviewData);
      setReviewData(queryCache(`dish.${dishID}`));
    } else {
      if (res.status === 429) {
        setError({
          header: "Slow down!",
          message: "You are sending too many requests. Try again in a bit.",
        });
      } else if (res.status === 500) {
        setError({
          header: "Something went wrong...",
          message:
            "Something unexpected occured on our end. Try again in a bit.",
        });
      }
    }
  }

  function validateFile(event: React.ChangeEvent<HTMLInputElement>) {
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    const selectedFile = event.target.files?.[0];

    if (selectedFile)
      setFileError(!allowedFileTypes.includes(selectedFile.type));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper style={{ padding: "1rem" }}>
          <FormDialogModal
            onClick={() => {
              if (!loading) {
                setOpen(false);
                setIsWritingReview(false);
              }
            }}
            open={open}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Paper style={{ padding: "1rem" }}>
                {error ? (
                  <>
                    <Typography variant="h6" style={{ color: "red" }}>
                      Success!
                    </Typography>
                    <Typography>Your review has been posted.</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" style={{ color: "var(--brand)" }}>
                      Success!
                    </Typography>
                    <Typography>Your review has been posted.</Typography>
                  </>
                )}
              </Paper>
            )}
          </FormDialogModal>
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
                  placeholder="Any further comments you want to share. Elaborate!"
                  name="review-comments"
                  required
                />
                <span>{`${comments.length}/500`}</span>
              </label>
            </div>
            <label>
              Image
              <input
                type="file"
                name="content-image"
                accept="image/jpg, image/jpeg, image/png, image/webp"
                onChange={validateFile}
              />
              <span style={{ color: "red" }}>
                {fileError
                  ? "Invalid file type. Accepted file types are jpg, jpeg, png, and webp."
                  : "\u00A0"}
              </span>
            </label>
            <label style={{ alignItems: "flex-start" }}>
              Rating
              <Rating
                precision={0.25}
                sx={{ fontSize: "2rem" }}
                onChange={(event, newValue) => setRating(newValue)}
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
