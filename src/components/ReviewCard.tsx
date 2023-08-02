import { Paper } from "@mui/material";
import "../styles/reviews-modal.css";
import React from "react";

export interface ReviewData {
  verdict: string;
  rating: number;
  image: string;
  likes: number;
  dislikes: number;
  userName: string;
}

export default function ReviewCard({
  verdict,
  rating,
  image,
  likes,
  dislikes,
}: ReviewData) {
  return <Paper className="review" style={{ padding: "1rem" }}></Paper>;
}
