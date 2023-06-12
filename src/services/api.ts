import { DishData } from "../components/DishCard";
import { LocationData } from "../components/LocationCard";

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

    const locations = await response.json();

    const locationData: LocationData[] = locations.map((location: any) => ({
      type: "location",
      ...location,
    }));

    return locationData;
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

    const dishes = await response.json();

    const dishData: DishData[] = dishes.map((dish: any) => ({
      type: "dish",
      ...dish,
    }));

    return dishData;
  } catch (error) {
    console.error("Error occurred during fetchDishes:", error);
    throw error;
  }
}
