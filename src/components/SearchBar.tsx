import React, { useState } from "react";
import fetchSearch from "../services/api";
import { Link } from "react-router-dom";

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
  const [borderRadius, setBorderRadius] = useState("15px");

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
      setBorderRadius("15px 15px 0px 0px");
    } else {
      setBorderRadius("15px");
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

export function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <div className="suggestions">
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <Link
              to={`/campus/${suggestion.id}/locations?name=${encodeURIComponent(
                suggestion.name
              )}`}
            >
              <img src="/images/magnify.svg" alt="Magnify" />
              {suggestion.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
