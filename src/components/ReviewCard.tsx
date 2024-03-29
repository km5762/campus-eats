import { IconButton, Paper, Rating, Tooltip, Typography } from "@mui/material";
import "../styles/reviews-modal.css";
import Avatar from "boring-avatars";
import React, { useState } from "react";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import Modal from "@mui/base/Modal";
import { useAuth } from "../contexts/AuthProvider";
import { useUserVotesStore } from "../contexts/UserVotesStoreProvider";

export interface ReviewData {
  id: number;
  verdict: string;
  comments: string;
  rating: number;
  image: string;
  likes: number;
  dislikes: number;
  username: string;
  createdAt: Date;
  usersVote: boolean | null;
}

export interface VoteData {
  reviewID: number;
  value: boolean;
}

export default function ReviewCard({
  id,
  verdict,
  comments,
  rating,
  image,
  likes,
  dislikes,
  username,
  createdAt,
  usersVote,
}: ReviewData) {
  const [open, setOpen] = useState(false);
  const { addVote, userVotesStore } = useUserVotesStore();
  const placeHolderVote = userVotesStore[id];
  const session = useAuth();

  const isLiked =
    (usersVote === true && placeHolderVote === undefined) ||
    placeHolderVote === true;
  const isDisliked =
    (usersVote === false && placeHolderVote === undefined) ||
    placeHolderVote === false;

  function handleLike() {
    if (isLiked) addVote(id, null);
    else if (
      (placeHolderVote === undefined ||
        placeHolderVote === false ||
        placeHolderVote === null) &&
      (usersVote === null || usersVote === false || usersVote === true)
    )
      addVote(id, true);
  }

  function handleDislike() {
    if (isDisliked) addVote(id, null);
    else if (
      (placeHolderVote === undefined ||
        placeHolderVote === true ||
        placeHolderVote === null) &&
      (usersVote === null || usersVote === true || usersVote === false)
    )
      addVote(id, false);
  }

  return (
    <Paper className="review" style={{ padding: "1rem", objectFit: "contain" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <IconButton
          sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          disableTouchRipple={true}
        >
          <Avatar size={40} name={username} variant="beam" />
        </IconButton>
        <div>
          <Typography>{username}</Typography>
          <Rating value={rating} precision={0.25} readOnly />
        </div>
      </div>
      <Typography variant="h6" fontStyle={"italic"}>
        {verdict}
      </Typography>
      <hr style={{ margin: "1rem 0rem" }} />
      <div>
        <Typography style={{ overflow: "hidden", margin: "1rem 0rem" }}>
          <img
            onClick={() => setOpen(true)}
            src="https://wallpapersmug.com/download/1080x1920/ddcbbf/food-pizza-baking.jpg"
            style={{
              float: "right",
              maxWidth: "150px",
              maxHeight: "100%",
              borderRadius: "15px",
              marginTop: "0.15rem",
            }}
          />
          {comments}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "1rem",
        }}
      >
        <div>
          <Tooltip title={session ? "Helpful" : "Sign in to like this review!"}>
            <span>
              <IconButton onClick={handleLike} disabled={!session}>
                <ThumbUp
                  fontSize="large"
                  style={{
                    color: isLiked ? "var(--brand)" : undefined,
                  }}
                />
              </IconButton>
            </span>
          </Tooltip>
          <Typography variant="caption" fontSize={"1.25rem"}>
            {placeHolderVote === true && placeHolderVote !== usersVote
              ? likes + 1
              : (placeHolderVote === false || placeHolderVote === null) &&
                usersVote === true
              ? likes - 1
              : likes}
          </Typography>
        </div>
        <div>
          <Tooltip
            title={session ? "Not helpful" : "Sign in to dislike this review!"}
          >
            <span>
              <IconButton onClick={handleDislike} disabled={!session}>
                <ThumbDown
                  fontSize="large"
                  style={{
                    color: isDisliked ? "var(--brand)" : undefined,
                  }}
                />
              </IconButton>
            </span>
          </Tooltip>
          <Typography variant="caption" fontSize={"1.25rem"}>
            {placeHolderVote === false && placeHolderVote !== usersVote
              ? dislikes + 1
              : (placeHolderVote === true || placeHolderVote === null) &&
                usersVote === false
              ? dislikes - 1
              : dislikes}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
