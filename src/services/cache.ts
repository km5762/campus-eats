import { DishData } from "../components/DishCard";
import { fetchApprovedLocations, fetchApprovedDishes } from "./api";
import { LocationData } from "../components/LocationCard";

interface Cache {
  campus: { [id: number]: LocationData[] };
  location: { [id: number]: DishData[] };
}

type CacheQueryType = "location" | "campus";
type CacheQuery = `${CacheQueryType}.${number}`;

export const cache: Cache = { campus: {}, location: {} };

export async function queryThroughCache(
  query: `${"location"}.${number}`
): Promise<DishData[]>;

export async function queryThroughCache(
  query: `${"campus"}.${number}`
): Promise<LocationData[]>;

// Use if it is not known whether the query is cached
export async function queryThroughCache(
  query: string
): Promise<LocationData[] | DishData[]> {
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

export function queryCache(query: `${"location"}.${number}`): DishData[];

export function queryCache(query: `${"campus"}.${number}`): LocationData[];

export function queryCache(query: `${"campus"}.${number}`): LocationData[];

// Use only if you know the query is cached
export function queryCache(query: CacheQuery): DishData[] | LocationData[] {
  const [type, id] = query.split(".") as [CacheQueryType, number];

  const cacheType = cache[type];

  if (id in cacheType) {
    return cacheType[id];
  } else {
    throw new CacheMissError(
      query,
      "Error: Attempted query not cached. Use queryThroughCache if you are unsure a query is cached."
    );
  }
}

export class CacheMissError extends Error {
  message: string;
  query: CacheQuery;

  constructor(query: CacheQuery, message: string) {
    super(message);
    this.message = message;
    this.query = query;
  }
}
