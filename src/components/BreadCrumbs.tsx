import React, { useState } from "react";
import LocationCard, { Location } from "./LocationCard";
import DishCard, { Dish } from "./DishCard";

export interface BreadCrumb {
  class: string;
  name: string;
  cards: React.JSX.Element[];
}

export default function BreadCrumbs({
  breadCrumbs,
  setBreadCrumbs,
  setContentArray,
  setContentClass,
}: {
  breadCrumbs: BreadCrumb[];
  setContentArray: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
  setContentClass: React.Dispatch<React.SetStateAction<string>>;
  setBreadCrumbs: React.Dispatch<React.SetStateAction<BreadCrumb[]>>;
}) {
  function handleBreadCrumbClick(index: number) {
    const breadCrumb = breadCrumbs[index];
    setContentArray(breadCrumb.cards);
    setContentClass(breadCrumb.class);
    setBreadCrumbs(breadCrumbs.slice(0, index + 1));
  }

  return (
    <div className="bread-crumbs">
      {breadCrumbsToButtons(breadCrumbs, handleBreadCrumbClick)}
    </div>
  );
}

function breadCrumbsToButtons(
  breadCrumbs: BreadCrumb[],
  handleBreadCrumbClick: (index: number) => void
) {
  const buttons: React.JSX.Element[] = [];

  for (let i = 0; i < breadCrumbs.length; i++) {
    const breadCrumb = breadCrumbs[i];
    buttons.push(
      <button key={breadCrumb.class} onClick={() => handleBreadCrumbClick(i)}>
        {breadCrumb.name}
      </button>
    );
  }

  return buttons;
}
