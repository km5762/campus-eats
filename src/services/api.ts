export default async function fetchSearch(query: string) {
  try {
    const response = await fetch(
      `/api/campus/search?query=${encodeURIComponent(query)}`
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

export async function fetchLocations(campusID: number) {
  try {
    const response = await fetch(`/api/campus/${campusID}/locations`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const locations = await response.text();
    return JSON.parse(locations);
  } catch (error) {
    console.error("Error occurred during fetchLocations:", error);
    throw error;
  }
}

export async function fetchDishes(locationID: number) {
  try {
    const response = await fetch(`/api/locations/${locationID}/dishes`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const dishes = await response.text();
    return JSON.parse(dishes);
  } catch (error) {
    console.error("Error occurred during fetchDishes:", error);
    throw error;
  }
}
