export default async function fetchSearch(query: string) {
  try {
    const response = await fetch(
      `/campus/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error: ${response.status}`);
    }

    const suggestions = await response.text();
    return JSON.parse(suggestions);
  } catch (error) {
    console.error("Error occurred during fetchSearch:", error);
    throw error;
  }
}
