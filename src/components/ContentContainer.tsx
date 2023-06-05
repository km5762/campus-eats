import { Rating, useMediaQuery } from "@mui/material";
import React, { useState } from "react";

export interface Location {
  id: number;
  name: string;
  rating: number;
  count: number;
}

interface Dish {
  id: number;
  name: string;
  price: number;
  availability: string;
  rating: number;
}

export default function ContentContainer({
  locations,
}: {
  locations: Location[];
}) {
  const locationComponents = locations.map((location) => (
    <LocationCard
      key={location.id}
      id={location.id}
      name={location.name}
      rating={location.rating}
      count={location.count}
    />
  ));
  const [contentClass, setContentClass] = useState("locations");
  const [contentArray, setContentArray] = useState(locationComponents);

  return (
    <>
      <div className={contentClass}>{contentArray}</div>
    </>
  );
}

export function LocationCard({ id, name, rating, count }: Location) {
  const smallScreen = useMediaQuery("(max-width: 890px)");
  return (
    <>
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
        <button>{`See all ${count} dishes`}</button>
      </div>
    </>
  );
}
