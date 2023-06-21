import { IconButton } from "@mui/material";
import { NavigateBefore } from "@mui/icons-material";
import React from "react";
import { CardData } from "./ContentContainer";
import { BreadCrumb } from "./BreadCrumbs";
import { queryCache } from "../services/cache";

export default function BackButton({
  setContentArray,
  setContentClass,
  breadCrumbs,
}: {
  setContentArray: React.Dispatch<React.SetStateAction<CardData[]>>;
  setContentClass: React.Dispatch<React.SetStateAction<string>>;
  breadCrumbs: BreadCrumb[];
}) {
  function handleClick() {
    setContentArray(queryCache(breadCrumbs[0].query));
    setContentClass("locations");
  }

  return (
    <IconButton sx={{ color: "#6184d8" }} onClick={handleClick}>
      <NavigateBefore />
    </IconButton>
  );
}
