import { Button, Menu, MenuItem, MenuList } from "@mui/material";
import {
  ArrowDropDown,
  ArrowDropDownSharp,
  ArrowDropUp,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { ClickAwayListener, Popper } from "@mui/base";
import { ContentData } from "../services/cache";

export default function SortContentDropdown({
  contentData,
  setContentData,
}: {
  contentData: ContentData[];
  setContentData: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  function compareContentData(
    a: ContentData,
    b: ContentData,
    criteria: keyof ContentData
  ) {
    if (a[criteria] < b[criteria]) {
      return -1;
    } else if (a[criteria] > b[criteria]) {
      return 1;
    } else {
      return 0;
    }
  }

  function createComparator(criteria: keyof ContentData, negate?: boolean) {
    return function (a: ContentData, b: ContentData) {
      return negate
        ? -compareContentData(a, b, criteria)
        : compareContentData(a, b, criteria);
    };
  }

  return (
    <div>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Button
          onClick={() => setOpen(!open)}
          ref={anchorRef}
          style={{
            color: "white",
            float: "right",
            border: "solid var(--brandAccent) 1px",
            paddingLeft: "10px",
            paddingRight: "10px",
            textTransform: "none",
            font: "inherit",
          }}
          sx={{
            backgroundColor: "var(--brand)",
            "&:hover": {
              backgroundColor: "var(--brandAccent)",
            },
            "&:disabled": {
              backgroundColor: "var(--brandAccent)",
            },
          }}
          endIcon={
            <ArrowDropDown
              fontSize="medium"
              sx={{
                transform: `rotate(${open ? 180 : 0}deg)`, // Apply the rotation here
                transition: "transform 0.3s ease", // Add a transition for smooth effect
              }}
            />
          }
        >
          Sort by
        </Button>
      </ClickAwayListener>
      <Popper anchorEl={anchorRef.current} open={open} placement="bottom-end">
        <MenuList style={{ marginTop: "1rem" }}>
          <MenuItem
            onClick={() =>
              setContentData(
                [...contentData].sort(createComparator("rating", true))
              )
            }
          >
            Rating (descending)
          </MenuItem>
          <MenuItem
            onClick={() =>
              setContentData([...contentData].sort(createComparator("rating")))
            }
          >
            Rating (ascending)
          </MenuItem>
        </MenuList>
      </Popper>
    </div>
  );
}
