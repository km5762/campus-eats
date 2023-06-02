import React, { useState } from "react";

export interface Location {
  id: number;
  name: string;
  rating: number;
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
  const [contentClass, setContentClass] = useState("locations");
  const [contentArray, setContentArray] = useState(locations);

  return (
    <>
      <div className={contentClass}></div>
    </>
  );
}

export function LocationCard({ id, name, rating }: Location) {
  return (
    <>
      <div className="location">
        <span>{name}</span>
        <span>
          <em>See all 50 dishes</em>
        </span>
      </div>
    </>
  );
}
