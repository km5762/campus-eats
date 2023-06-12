import React, { useEffect, useState } from "react";
import BreadCrumbs, { BreadCrumb } from "./BreadCrumbs";
import DishCard, { DishData } from "./DishCard";
import LocationCard, { LocationData } from "./LocationCard";
import { queryThroughCache, cache } from "../services/cache";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export type CardData = DishData | LocationData;

export default function ContentContainer({
  locations,
  campusName,
  campusID,
}: {
  locations: LocationData[];
  campusName: string;
  campusID: number;
}) {
  const [contentClass, setContentClass] = useState("locations");
  const [contentArray, setContentArray] = useState<CardData[]>(locations);
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([
    { class: "locations", name: campusName, query: `campus.${campusID}` },
  ]);

  async function handleLocationCardClick(id: number, name: string) {
    const dishes = await queryThroughCache(`location.${id}`);

    setContentClass("dishes");
    setBreadCrumbs((breadCrumbs) => [
      ...breadCrumbs,
      { class: "dishes", name: name, query: `location.${id}` },
    ]);
    setContentArray(dishes);
  }

  async function handleDishCardClick(id: number, name: string) {}

  function parseData(data: CardData[]) {
    const cards: ReactJSXElement[] = [];
    for (let i = 0; i < data.length; i++) {
      switch (data[i].type) {
        case "location":
          const locationData = data[i] as LocationData;
          cards.push(
            <LocationCard
              {...locationData}
              key={locationData.id}
              onLocationCardClick={handleLocationCardClick}
            />
          );
          break;
        case "dish":
          const dishData = data[i] as DishData;
          cards.push(
            <DishCard
              {...dishData}
              key={dishData.id}
              onDishCardClick={handleDishCardClick}
            />
          );
          break;
      }
    }
    return cards;
  }

  useEffect(() => {
    cache.campus[campusID] = locations; // Seed cache with initial location data from server
  }, []);

  return (
    <>
      <BreadCrumbs
        breadCrumbs={breadCrumbs}
        setContentArray={setContentArray}
        setContentClass={setContentClass}
        setBreadCrumbs={setBreadCrumbs}
      />
      <div className={contentClass}>{parseData(contentArray)}</div>
    </>
  );
}
