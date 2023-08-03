import { IconButton, Paper, Rating, Tooltip, Typography } from "@mui/material";
import "../styles/reviews-modal.css";
import Avatar from "boring-avatars";
import React, { useState } from "react";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import Modal from "@mui/base/Modal";

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
}: ReviewData) {
  const [open, setOpen] = useState(false);
  return (
    <Paper
      className="review"
      style={{ padding: "1rem", objectFit: "contain", margin: "1rem 0rem" }}
    >
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
          <Tooltip title="Helpful">
            <IconButton>
              <ThumbUp fontSize="large" />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" fontSize={"1.25rem"}>
            {likes}
          </Typography>
        </div>
        <div>
          <Tooltip title="Not Helpful">
            <IconButton>
              <ThumbDown fontSize="large" />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" fontSize={"1.25rem"}>
            {dislikes}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
