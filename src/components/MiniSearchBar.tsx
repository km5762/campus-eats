import React, { useState } from "react";
import fetchSearch from "../services/api";
import { Suggestions } from "./SearchBar";
import { Suggestion } from "./SearchBar";

export default function MiniSearchBar() {
  const initialState: Suggestion[] = [];
  const [suggestions, setSuggestions] = useState(initialState);
  const [searchValue, setSearchValue] = useState("");

  async function handleInput(event: any) {
    const currentSearch = event.target.value;
    setSearchValue(currentSearch);
    let result = [];

    if (currentSearch !== "") {
      result = await fetchSearch(currentSearch);

      if (result.length > 5) {
        result = result.slice(0, 5);
      }
    }

    setSuggestions(result);
  }

  return (
    <>
      <input
        type="search"
        onInput={handleInput}
        value={searchValue}
        placeholder="Find my school!"
      />
      <Suggestions suggestions={suggestions} />
    </>
  );
}
