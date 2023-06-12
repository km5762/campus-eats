import { Rating, useMediaQuery } from "@mui/material";
import React from "react";

export interface LocationData {
  type: "location";
  id: number;
  name: string;
  rating: number;
  count: number;
}

export interface LocationCardProps {
  key: number;
  id: number;
  name: string;
  rating: number;
  count: number;
  onLocationCardClick: Function;
}

export default function LocationCard({
  id,
  name,
  rating,
  count,
  onLocationCardClick,
}: LocationCardProps) {
  const smallScreen = useMediaQuery("(max-width: 890px)");

  const handleButtonClick = () => {
    onLocationCardClick(id, name);
  };

  return (
    <div className="location">
      <span>{name}</span>
      <div className="rating-container">
        <span className="decimal-value">{rating}</span>
        <Rating
          name="read-only"
          value={smallScreen ? 1 : rating}
          max={smallScreen ? 1 : 5}
          precision={0.25}
          sx={smallScreen ? { svg: { width: "4vw" } } : undefined}
          readOnly
        />
      </div>
      <button onClick={handleButtonClick}>{`See all ${count} dishes`}</button>
    </div>
  );
}
