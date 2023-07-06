import { DishData } from "../components/DishCard";
import { LocationData } from "../components/LocationCard";
import { Suggestion } from "../components/SearchBar";
import { supabaseClient } from "./supabaseClient";

export default async function fetchSearch(search: string) {
  try {
    const { data, error } = await supabaseClient
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

export async function fetchApprovedLocations(campusID: number) {
  try {
    const { data, error } = await supabaseClient.rpc(
      "fn_get_approved_locations_at",
      {
        p_id: campusID,
      }
    );

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
    const { data, error } = await supabaseClient
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

export interface InsertDataResponse {
  successful: boolean;
  nextPostTime: Date;
}

export async function insertLocation(
  name: string,
  campusID: number
): Promise<InsertDataResponse> {
  const { data, error } = await supabaseClient.rpc("fn_insert_location", {
    p_name: name,
    p_campus_id: campusID,
  });

  if (error) {
    throw error;
  }

  const { next_post_time, successful } = data;

  return { nextPostTime: new Date(next_post_time), successful };
}
