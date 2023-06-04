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
  return (
    <>
      <div className="location">
        <span>{name}</span>
        <a>{`See all ${count} dishes`}</a>
      </div>
    </>
  );
}
