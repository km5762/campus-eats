import { Rating, useMediaQuery } from "@mui/material";
import React from "react";
import { Button } from "@mui/base";

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
  const smallestScreen = useMediaQuery("(max-width: 400px");
  const notStacked = smallScreen && !smallestScreen;

  const handleButtonClick = () => {
    onLocationCardClick(id, name);
  };

  return (
    <div className="location">
      <span className="name">{name}</span>
      <div className="rating-container">
        <span className="decimal-value">{Math.round(rating * 100) / 100}</span>
        <Rating
          name="read-only"
          value={notStacked ? 1 : rating}
          max={notStacked ? 1 : 5}
          precision={0.25}
          sx={smallScreen ? { svg: { width: "4vw" } } : undefined}
          readOnly
        />
      </div>
      <Button onClick={handleButtonClick}>{`See all ${count} dishes`}</Button>
    </div>
  );
}
