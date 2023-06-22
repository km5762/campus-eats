import React from "react";
import { Rating, useMediaQuery } from "@mui/material";

export interface DishData {
  type: "dish";
  id: number;
  name: string;
  price: number;
  availability: string;
  rating: number;
}

export interface DishCardProps {
  key: number;
  id: number;
  name: string;
  price: number;
  availability: string;
  rating: number;
  onDishCardClick: Function;
}

export default function DishCard({
  id,
  name,
  price,
  availability,
  rating,
  onDishCardClick,
}: DishCardProps) {
  return (
    <div className="dish">
      <div className="top-half">
        <h2>{name}</h2>
        <Rating
          name="read-only"
          value={rating}
          precision={0.25}
          sx={{ svg: { width: "clamp(16px, 4vw, 24px)" } }}
          readOnly
        />
      </div>
      <div className="bottom-half">
        <h2>{`$${price}`}</h2>
        <h3>{formatAvailability(availability)}</h3>
      </div>
    </div>
  );
}

function formatAvailability(binaryString: string) {
  let formattedString = "";

  if (binaryString.charAt(0) === "1") {
    formattedString += "Breakfast, ";
  }

  if (binaryString.charAt(1) === "1") {
    formattedString += "Lunch, ";
  }

  if (binaryString.charAt(2) === "1") {
    formattedString += "Dinner";
  }

  // Remove trailing comma and whitespace
  formattedString = formattedString.trim().replace(/,\s*$/, "");

  return formattedString;
}