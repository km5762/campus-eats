import { useRadioGroup } from "@mui/material";
import { DishData } from "../components/DishCard";
import { LocationData } from "../components/LocationCard";
import { Suggestion } from "../components/SearchBar";
import { supabaseClient } from "./supabaseClient";
import generateKey from "./generateKey";

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

export async function insertDish(
  name: string,
  locationID: number,
  price: number,
  breakfast: boolean,
  lunch: boolean,
  dinner: boolean,
  img?: File
): Promise<InsertDataResponse> {
  let imgKey = null;

  if (img) {
    // imgKey = generateKey(supabaseClient.auth.)
    const res = await uploadImage(img);
    console.log(res);
    imgKey = res.imgKey;
  }

  const { data, error } = await supabaseClient.rpc("fn_insert_dish", {
    p_name: name,
    p_location_id: locationID,
    p_price: price,
    p_breakfast: breakfast,
    p_lunch: lunch,
    p_dinner: dinner,
    p_image: imgKey,
  });

  if (error) {
    throw error;
  }

  const { next_post_time, successful } = data;

  return { nextPostTime: new Date(next_post_time), successful };
}

export async function uploadImage(img: File) {
  const sessionData = await supabaseClient.auth.getSession();
  const userID = sessionData.data.session?.user.id;
  const jwt = sessionData.data.session?.access_token;
  const res = await fetch("/upload", {
    method: "POST",
    body: img,
    headers: {
      "Content-Type": img.type,
      Authorization: `Bearer ${jwt}`,
      "X-User-ID": userID ?? "",
    },
  });

  return await res.json();
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

  console.log(data);

  const { location_countdown, dish_countdown } = data;

  return {
    locationCountdown: new Date(location_countdown),
    dishCountdown: new Date(dish_countdown),
  };
}

export async function insertContent(formData: FormData) {
  const sessionData = await supabaseClient.auth.getSession();
  const userID = sessionData.data.session?.user.id;
  const jwt = sessionData.data.session?.access_token;

  await fetch("/api/dishes", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "X-User-ID": userID ?? "",
    },
  });
}
