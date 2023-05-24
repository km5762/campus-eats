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
  const [paddingBottom, setPaddingBottom] = useState("0px");

  async function handleInput(event: any) {
    const currentSearch = event.target.value;
    setSearchValue(currentSearch);
    const result = await fetchSearch(currentSearch);
    setSuggestions(result);

    if (result.length > 0) {
      setBorderRadius("10px 10px 0px 0px");
      setPaddingBottom("10px");
    } else {
      setBorderRadius("10px");
      setPaddingBottom("0px");
    }
  }

  return (
    <div className="search-container">
      <input
        style={{ borderRadius: borderRadius }}
        type="search"
        onInput={handleInput}
        placeholder="Find my school!"
      />
      <Suggestions suggestions={suggestions} paddingBottom={paddingBottom} />
    </div>
  );
}

function Suggestions({
  suggestions,
  paddingBottom,
}: SuggestionsProps & { paddingBottom: string }) {
  return (
    <div className="suggestions">
      <ul style={{ paddingBottom: paddingBottom }}>
        {suggestions.map((suggestion) => (
          <li>
            <a key={suggestion.id}>{suggestion.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
