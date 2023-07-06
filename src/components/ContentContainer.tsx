import React, { useEffect, useState } from "react";
import BreadCrumbs, { BreadCrumb } from "./BreadCrumbs";
import DishCard, { DishData } from "./DishCard";
import LocationCard, { LocationData } from "./LocationCard";
import { queryThroughCache, cache } from "../services/cache";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useMediaQuery } from "@mui/material";
import BackButton from "./BackButton";
import AddLocationInterface from "./AddContentInterface";
import AddContentInterface from "./AddContentInterface";
import AddContentCountdownManager from "./AddContentCountdownManager";

export type CardData = DishData | LocationData;
export type ContentClass = "locations" | "dishes";

export default function ContentContainer({
  locations,
  campusName,
  campusID,
  openAuthModal,
  closeAuthModal,
}: {
  locations: LocationData[];
  campusName: string;
  campusID: number;
  openAuthModal: Function;
  closeAuthModal: Function;
}) {
  const [contentClass, setContentClass] = useState<ContentClass>("locations");
  const [contentArray, setContentArray] = useState<CardData[]>(locations);
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([
    { class: "locations", name: campusName, query: `campus.${campusID}` },
  ]);
  const smallScreen = useMediaQuery("(max-width: 650px)");

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
      {smallScreen ? (
        <BackButton
          breadCrumbs={breadCrumbs}
          setContentArray={setContentArray}
          setContentClass={setContentClass}
        />
      ) : (
        <BreadCrumbs
          breadCrumbs={breadCrumbs}
          setContentArray={setContentArray}
          setContentClass={setContentClass}
          setBreadCrumbs={setBreadCrumbs}
        />
      )}
      <div className="content-container">
        <h2 className="content-label">{formatHeader(contentClass)}</h2>
        <div className={contentClass}>
          {contentArray.length === 0
            ? formatEmptyMessage(contentClass)
            : parseData(contentArray)}
        </div>
        <AddContentCountdownManager
          contentClass={contentClass}
          openAuthModal={openAuthModal}
          campusID={campusID}
        />
      </div>
    </>
  );
}

function formatEmptyMessage(contentClass: string) {
  switch (contentClass) {
    case "locations":
      return (
        <h2 className="empty-message">
          This campus has no locations.
          <br /> Be the first to add one!
        </h2>
      );
      break;
    case "dishes":
      return (
        <h2 className="empty-message">
          This location has no dishes.
          <br /> Be the first to add one!
        </h2>
      );
      break;
  }
}

function formatHeader(contentClass: string) {
  switch (contentClass) {
    case "locations":
      return "Dining Locations";
      break;
    case "dishes":
      return "Available Dishes";
      break;
  }
}
