import React from "react";
import { Rating, useMediaQuery } from "@mui/material";

export interface DishData {
  type: "dish";
  id: number;
  name: string;
  price: number;
  rating: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

export interface DishCardProps {
  key: number;
  id: number;
  name: string;
  price: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  rating: number;
  onDishCardClick: Function;
}

export default function DishCard({
  id,
  name,
  price,
  breakfast,
  lunch,
  dinner,
  rating,
  onDishCardClick,
}: DishCardProps) {
  function formatAvailability() {
    let formattedString = "";

    if (breakfast) {
      formattedString += "Breakfast, ";
    }

    if (lunch) {
      formattedString += "Lunch, ";
    }

    if (dinner) {
      formattedString += "Dinner";
    }

    // Remove trailing comma and whitespace
    formattedString = formattedString.trim().replace(/,\s*$/, "");

    return formattedString;
  }

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
        <h3>{formatAvailability()}</h3>
      </div>
    </div>
  );
}
