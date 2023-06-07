import { IconButton, Rating, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { fetchDishes, fetchLocations } from "../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Route, Routes, useParams } from "react-router-dom";

export interface LocationData {
  type: "location";
  id: number;
  name: string;
  rating: number;
  count: number;
}

interface DishData {
  type: "dish";
  id: number;
  name: string;
  price: number;
  availability: string;
  rating: number;
}

export interface LocationCardProps {
  id: number;
  name: string;
  rating: number;
  count: number;
}

interface DishCardProps {
  id: number;
  name: string;
  price: number;
  availability: string;
  rating: number;
}

type CardData = LocationData | DishData;

interface ContentContainerProps {
  cardData: CardData[];
  className: string;
}

function DishContentContainerWrapper(id: number, className: string) {
  return <ContentContainer cardData={fetchDishes(id)} />;
}

export default function ContentContainer({
  cardData,
  className,
}: ContentContainerProps) {
  let renderedCards: React.ReactNode[] = [];
  let contentID = useParams();

  cardData.forEach((data) => {
    switch (data.type) {
      case "location":
        renderedCards.push(
          <LocationCard
            id={data.id}
            name={data.name}
            rating={data.rating}
            count={data.count}
          />
        );
        break;
      case "dish":
        renderedCards.push(
          <DishCard
            id={data.id}
            name={data.name}
            price={data.price}
            availability={data.availability}
            rating={data.rating}
          />
        );
        break;
    }
  });

  return (
    <>
      <Routes>
        <Route
          path="/:id/dishes"
          element={
            <ContentContainer
              className="dishes"
              cardData={fetchDishes(contentID)}
            />
          }
        />
        <Route
          path="/:id/dishes/:dishID/reviews"
          element={<ContentContainer className="reviews" cardData={} />}
        />
      </Routes>
      <div className={className}>{renderedCards}</div>
    </>
  );
}

export function LocationCard({ id, name, rating, count }: LocationCardProps) {
  const smallScreen = useMediaQuery("(max-width: 890px)");

  return (
    <div className="location">
      <span>{name}</span>
      <div className="rating-container">
        <span className="decimal-value">{rating}</span>
        <Rating
          name="read-only"
          value={smallScreen ? 1 : rating}
          max={smallScreen ? 1 : 5}
          precision={0.5}
          sx={smallScreen ? { svg: { width: "4vw" } } : undefined}
          readOnly
        />
      </div>
      <button>{`See all ${count} dishes`}</button>
    </div>
  );
}

function DishCard({ id, name, price, availability, rating }: DishCardProps) {
  return (
    <div className="dish">
      <div className="top-half">
        <h2>{name}</h2>
        <Rating name="read-only" value={rating} precision={0.5} readOnly />
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
