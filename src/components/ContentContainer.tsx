import { IconButton, Rating, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchDishes } from "../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BreadCrumb } from "./BreadCrumbs";
import BreadCrumbs from "./BreadCrumbs";

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
  campusName,
}: {
  locations: Location[];
  campusName: string;
}) {
  const [contentClass, setContentClass] = useState("locations");
  const [contentArray, setContentArray] = useState<React.JSX.Element[]>(
    locations.map((location) => (
      <LocationCard
        key={location.id}
        id={location.id}
        name={location.name}
        rating={location.rating}
        count={location.count}
        onLocationCardClick={handleLocationCardClick}
      />
    ))
  );
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([
    { class: "locations", name: campusName, cards: contentArray },
  ]);

  async function handleLocationCardClick(id: number, name: string) {
    const res = await fetchDishes(id);
    const dishes: Dish[] = res.map((dish: any) => ({
      ...dish,
    }));
    const dishCards = dishes.map((dish) => (
      <DishCard
        id={dish.id}
        name={dish.name}
        price={dish.price}
        availability={dish.availability}
        rating={dish.rating}
        onDishCardClick={(id) => console.log("yee")}
      />
    ));

    setContentClass("dishes");
    setBreadCrumbs((breadCrumbs) => [
      ...breadCrumbs,
      { class: "dishes", name: name, cards: dishCards },
    ]);
    setContentArray(dishCards);
  }

  return (
    <>
      <BreadCrumbs
        breadCrumbs={breadCrumbs}
        setContentArray={setContentArray}
        setContentClass={setContentClass}
        setBreadCrumbs={setBreadCrumbs}
      />
      <div className={contentClass}>{contentArray}</div>
    </>
  );
}

function LocationCard({
  id,
  name,
  rating,
  count,
  onLocationCardClick,
}: Location & { onLocationCardClick: (id: number, name: string) => void }) {
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

function DishCard({
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
