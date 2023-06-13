import React from "react";
import { queryCache, cache } from "../services/cache";
import { CardData } from "./ContentContainer";

export interface BreadCrumb {
  class: "locations" | "dishes";
  name: string;
  query: string;
}

export default function BreadCrumbs({
  breadCrumbs,
  setBreadCrumbs,
  setContentArray,
  setContentClass,
}: {
  breadCrumbs: BreadCrumb[];
  setContentArray: React.Dispatch<React.SetStateAction<CardData[]>>;
  setContentClass: React.Dispatch<React.SetStateAction<string>>;
  setBreadCrumbs: React.Dispatch<React.SetStateAction<BreadCrumb[]>>;
}) {
  function handleBreadCrumbClick(index: number) {
    const breadCrumb = breadCrumbs[index];
    setContentArray(queryCache(breadCrumb.query));
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
    if (i !== breadCrumbs.length - 1) {
      buttons.push(<span>&gt;</span>);
    }
  }

  return buttons;
}
