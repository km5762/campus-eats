import React, { useState } from "react";
import fetchSearch from "../services/api";
import { Suggestions } from "./SearchBar";
import { Suggestion } from "./SearchBar";

export default function MiniSearchBar({
  placeholder,
}: {
  placeholder: string;
}) {
  const initialState: Suggestion[] = [];
  const [suggestions, setSuggestions] = useState(initialState);
  const [searchValue, setSearchValue] = useState("");

  async function handleInput(event: any) {
    const currentSearch = event.target.value;
    setSearchValue(currentSearch);
    let result: Suggestion[] = [];

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
        placeholder={placeholder}
      />
      <Suggestions suggestions={suggestions} />
    </>
  );
}
