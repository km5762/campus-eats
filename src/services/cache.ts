import { DishData } from "../components/DishCard";
import {
  fetchApprovedLocations,
  fetchApprovedDishes,
  fetchReviews,
} from "./api";
import { LocationData } from "../components/LocationCard";
import { ReviewData } from "../components/ReviewCard";

interface Cache {
  campus: { [id: number]: LocationData[] };
  location: { [id: number]: DishData[] };
  dish: { [id: number]: ReviewData[] };
}

export type CacheQueryType = "location" | "campus" | "dish";
export type CacheQuery = `${CacheQueryType}.${number}`;

export const cache: Cache = { campus: {}, location: {}, dish: {} };

export async function queryThroughCache(
  query: `${"location"}.${number}`
): Promise<DishData[]>;

export async function queryThroughCache(
  query: `${"campus"}.${number}`
): Promise<LocationData[]>;

export async function queryThroughCache(
  query: `${"dish"}.${number}`
): Promise<ReviewData[]>;

// Use if it is not known whether the query is cached
export async function queryThroughCache(
  query: CacheQuery
): Promise<LocationData[] | DishData[] | ReviewData[]> {
  const [type, id] = query.split(".") as [CacheQueryType, number];

  const cacheType = cache[type];

  if (id in cacheType) {
    return cacheType[id];
  }

  let fetchData;
  if (type === "campus") {
    fetchData = fetchApprovedLocations;
  } else if (type === "location") {
    fetchData = fetchApprovedDishes;
  } else {
    fetchData = fetchReviews;
  }

  const data = await fetchData(id);
  cacheType[id] = data;
  return data;
}

export function queryCache(query: `${"location"}.${number}`): DishData[];

export function queryCache(query: `${"campus"}.${number}`): LocationData[];

export function queryCache(query: `${"dish"}.${number}`): ReviewData[];

// Use only if you know the query is cached
export function queryCache(
  query: CacheQuery
): DishData[] | LocationData[] | ReviewData[] {
  const [type, id] = query.split(".") as [CacheQueryType, number];

  const cacheType = cache[type];

  if (id in cacheType) {
    return cacheType[id];
  } else {
    throw new CacheMissError(query);
  }
}

export class CacheMissError extends Error {
  query: CacheQuery;

  constructor(query: CacheQuery) {
    super(
      "Error: Attempted query not cached. Use queryThroughCache if you are unsure a query is cached."
    );
    this.query = query;
  }
}

export class InvalidCacheTypeError extends Error {
  query: CacheQuery;

  constructor(query: CacheQuery) {
    super(
      `Error: Attempted query "${query}" invalid; Cache type "${
        query.split(".")[1]
      }" is not a valid cache query type.`
    );
    this.query = query;
  }
}
