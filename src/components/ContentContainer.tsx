import React, { useState } from "react";
import queryThroughCache from "../services/cache";
import BreadCrumbs, { BreadCrumb } from "./BreadCrumbs";
import DishCard, { Dish } from "./DishCard";
import LocationCard, { Location } from "./LocationCard";

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
    const res = await queryThroughCache(`location.${id}`);
    const dishes: Dish[] = res.map((dish: any) => ({
      ...dish,
    }));
    const dishCards = parseDishes(dishes, () => console.log("click"));

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

function parseLocations(
  locations: Location[],
  handleLocationCardClick: () => any
) {
  return locations.map((location) => (
    <LocationCard
      key={location.id}
      id={location.id}
      name={location.name}
      rating={location.rating}
      count={location.count}
      onLocationCardClick={handleLocationCardClick}
    />
  ));
}

function parseDishes(dishes: Dish[], handleDishCardClick: () => any) {
  return dishes.map((dish) => (
    <DishCard
      id={dish.id}
      name={dish.name}
      price={dish.price}
      availability={dish.availability}
      rating={dish.rating}
      onDishCardClick={handleDishCardClick}
    />
  ));
}
