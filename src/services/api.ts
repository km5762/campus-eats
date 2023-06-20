import { createClient } from "@supabase/supabase-js";
import { DishData } from "../components/DishCard";
import { LocationData } from "../components/LocationCard";
import { Suggestion } from "../components/SearchBar";

const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByYWF1bm50cmFxendvbWlrbGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1NDAzODMsImV4cCI6MjAwMDExNjM4M30.iy7rGNKGQ5HeK0xJhKN3OzXqbNnegkVVAic7rWZ-iXU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function fetchSearch(search: string) {
  try {
    const { data, error } = await supabase
      .from("campus")
      .select()
      .ilike("name", `%${search}%`);

    if (error) {
      throw error;
    }

    const searchData: Suggestion[] = data.map((suggestion: any) => ({
      ...suggestion,
    }));

    return searchData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchLocations(campusID: number) {
  try {
    const { data, error } = await supabase.rpc("fn_get_locations_at", {
      p_id: campusID,
    });

    if (error) {
      throw error;
    }

    const locationData: LocationData[] = data.map((location: any) => ({
      type: "location",
      ...location,
    }));

    return locationData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchDishes(locationID: number) {
  try {
    const { data, error } = await supabase
      .from("dish")
      .select("*")
      .eq("location_id", locationID);

    if (error) {
      throw error;
    }

    const dishData: DishData[] = data.map((dish: any) => ({
      type: "dish",
      ...dish,
    }));

    return dishData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
