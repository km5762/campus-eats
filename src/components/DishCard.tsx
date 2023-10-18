import React from "react";
import { Rating, Tooltip, useMediaQuery } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

export interface DishData {
  type: "dish";
  id: number;
  name: string;
  price: number;
  image?: string;
  rating: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

export interface DishCardProps {
  key: number;
  id: number;
  image?: string;
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
  image,
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
    <div
      className="dish"
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === "Enter") onDishCardClick(id);
      }}
      style={
        image
          ? {
              background: `linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent), url(https://f005.backblazeb2.com/file/campus-eats/${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: "white",
              textShadow: "0 2px 2px rgba(0, 0, 0, 1)",
            }
          : { backgroundColor: "var(--inputBorder)" }
      }
      onClick={() => onDishCardClick(id)}
    >
      <div className="top-half">
        <Tooltip
          title={name}
          placement="top-start"
          className="dish-name-tooltip"
        >
          <h1>{name}</h1>
        </Tooltip>
        <Rating
          name="read-only"
          value={rating}
          precision={0.25}
          sx={{
            svg: { width: "clamp(16px, 4vw, 24px)" },
            filter: image
              ? "drop-shadow(0 2px 2px rgba(0, 0, 0, 1))"
              : undefined,
          }}
          readOnly
          icon={image ? <Star className="star-overlayed" /> : undefined}
          emptyIcon={
            image ? <StarBorder className="empty-star-overlayed" /> : undefined
          }
        />
      </div>
      <div className="bottom-half">
        {price && <h2>{`$${price}`}</h2>}
        <h3>{formatAvailability()}</h3>
      </div>
    </div>
  );
}
