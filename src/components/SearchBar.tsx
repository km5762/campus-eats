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
    const result = await fetchSearch(currentSearch);
    setSuggestions(result);

    if (result.length > 0) {
      setBorderRadius("10px 10px 0px 0px");
    } else {
      setBorderRadius("10px");
    }
  }

  return (
    <div className="search-container">
      <input
        style={{ borderRadius: borderRadius }}
        type="search"
        onInput={handleInput}
      />
      <Suggestions suggestions={suggestions} />
    </div>
  );
}

function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <div className="suggestions">
      <ul>
        {suggestions.map((suggestion) => (
          <li>
            <a key={suggestion.id}>{suggestion.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
