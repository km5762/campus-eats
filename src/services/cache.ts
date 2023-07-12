import { DishData } from "../components/DishCard";
import { fetchApprovedLocations, fetchApprovedDishes } from "./api";
import { LocationData } from "../components/LocationCard";

interface Cache {
  campus: { [id: number]: LocationData[] };
  location: { [id: number]: DishData[] };
}

export const cache: Cache = { campus: {}, location: {} };

// Use if it is not known whether the query is cached
export async function queryThroughCache(query: string) {
  const [type, idString] = query.split(".");
  const id = parseInt(idString);

  if (type === "campus" || type === "location") {
    const cacheType = cache[type];

    if (id in cacheType) {
      return cacheType[id];
    }

    const fetchData =
      type === "campus" ? fetchApprovedLocations : fetchApprovedDishes;
    const data = await fetchData(id);
    cacheType[id] = data;
    return data;
  }

  throw new Error(`Error: cache type ${type} does not exist`);
}

// Use only if you know the query is cached
export function queryCache(query: string) {
  const [type, idString] = query.split(".");
  const id = parseInt(idString);

  if (type === "campus" || type === "location") {
    const cacheType = cache[type];

    if (id in cacheType) {
      return cacheType[id];
    } else {
      throw new Error(
        `Error: query "${query}" not cached. Use queryThroughCache if you are unsure whether the query is cached.`
      );
    }
  }

  throw new Error(`Error: cache type "${type}" does not exist`);
}
