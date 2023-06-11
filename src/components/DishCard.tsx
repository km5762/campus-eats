import React from "react";
import { Rating } from "@mui/material";

export interface Dish {
  id: number;
  name: string;
  price: number;
  availability: string;
  rating: number;
}

export default function DishCard({
  id,
  name,
  price,
  availability,
  rating,
  onDishCardClick,
}: Dish & { onDishCardClick: (id: number) => void }) {
  return (
    <div className="dish">
      <div className="top-half">
        <h2>{name}</h2>
        <Rating name="read-only" value={rating} precision={0.25} readOnly />
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
