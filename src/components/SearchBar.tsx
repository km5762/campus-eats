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

  function handleBlur() {
    setSuggestions([]);
  }

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
        onBlur={handleBlur}
        onFocus={handleInput}
        type="search"
        onInput={handleInput}
        value={searchValue}
        placeholder="Find my school!"
      />
      <Suggestions suggestions={suggestions} />
    </>
  );
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  function handleSuggestionClick(event: React.MouseEvent) {
    event.preventDefault();
  }

  return (
    <div className="suggestions">
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <a
              href={`/campus/${suggestion.id}/locations`}
              onMouseDown={(e) => handleSuggestionClick(e)}
            >
              <img src="/images/magnify.svg" alt="Magnify" />
              {suggestion.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
