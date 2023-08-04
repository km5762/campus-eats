import { useRadioGroup } from "@mui/material";
import { DishData } from "../components/DishCard";
import { LocationData } from "../components/LocationCard";
import { Suggestion } from "../components/SearchBar";
import { supabaseClient } from "./supabaseClient";
import generateKey from "./generateKey";
import { ReviewData } from "../components/ReviewCard";

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

export async function fetchApprovedDishes(locationID: number) {
  try {
    const { data, error } = await supabaseClient
      .from("dish")
      .select("*")
      .eq("location_id", locationID)
      .eq("status", "approved");

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

export interface TryPostResponse {
  successful: boolean;
  code: string;
  nextPostAt: Date;
}

export async function insertLocation(
  name: string,
  campusID: number
): Promise<TryPostResponse> {
  const { data, error } = await supabaseClient.rpc("fn_insert_location", {
    p_name: name,
    p_campus_id: campusID,
  });

  if (error) {
    throw error;
  }

  const { next_post_at, code, successful } = data;

  return { nextPostAt: new Date(next_post_at), code, successful };
}

export interface Countdowns {
  locationCountdown: Date;
  dishCountdown: Date;
}

export async function getCountdowns(): Promise<Countdowns> {
  const { data, error } = await supabaseClient.rpc(
    "fn_get_post_countdowns",
    {}
  );

  if (error) {
    throw error;
  }

  const { location_countdown, dish_countdown } = data;

  return {
    locationCountdown: new Date(location_countdown),
    dishCountdown: new Date(dish_countdown),
  };
}

export async function insertDish(formData: FormData, jwt?: string) {
  const res = await fetch("/api/dishes", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const json = await res.json();
  return {
    successful: res.ok,
    code: json.code,
    nextPostAt: new Date(json.nextPostAt),
  };
}

export async function fetchReviews(dishID: number, signal?: AbortSignal) {
  let request = supabaseClient.rpc("fn_get_reviews", {
    p_id: dishID,
  });

  if (signal) {
    request = request.abortSignal(signal);
  }

  const { data, error } = await request;

  if (error) {
    throw error;
  }

  const reviewData: ReviewData[] = data.map((review: any) => ({
    id: review.id,
    verdict: review.verdict,
    comments: review.comments,
    rating: review.rating,
    image: review.image,
    likes: review.likes,
    dislikes: review.dislikes,
    username: review.username,
    createdAt: new Date(review.created_at),
  }));

  return reviewData;
}
