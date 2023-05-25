import React, { useState } from "react";
import fetchSearch from "../services/api";

interface SuggestionsProps {
  suggestions: Suggestion[];
}

export interface Suggestion {
  id: number;
  name: string;
  rating: number;
}

export default function SearchBar() {
  const initialState: Suggestion[] = [];
  const [suggestions, setSuggestions] = useState(initialState);
  const [searchValue, setSearchValue] = useState("");
  const [borderRadius, setBorderRadius] = useState("10px");

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

    if (result.length > 0) {
      setBorderRadius("10px 10px 0px 0px");
    } else {
      setBorderRadius("10px");
    }
  }

  return (
    <>
      <input
        style={{ borderRadius: borderRadius }}
        type="search"
        onInput={handleInput}
        value={searchValue}
        placeholder="Find my school!"
      />
      <Suggestions suggestions={suggestions} />
    </>
  );
}

function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <div className="suggestions">
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <a href={`/campus/${suggestion.id}/locations`}>
              <img src="/images/magnify.svg" alt="Magnify" />
              {suggestion.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
