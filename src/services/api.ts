async function fetchSearch(query: string): Promise<JSON> {
  try {
    const response = await fetch(
      `/campus/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error occurred during fetchSearch:", error);
    throw error;
  }
}
