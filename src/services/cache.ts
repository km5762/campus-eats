import { Dish } from "../components/DishCard";
import { fetchLocations, fetchDishes } from "./api";

interface Cache {
  campus: { [id: number]: Location[] };
  location: { [id: number]: Dish[] };
}

export const cache: Cache = { campus: {}, location: {} };

export default async function queryThroughCache(query: string) {
  console.log(cache);
  const [type, idString] = query.split(".");
  const id = parseInt(idString);

  if (type === "campus" || type === "location") {
    const cacheType = cache[type];

    if (id in cacheType) {
      console.log("cached!");
      return cacheType[id];
    }

    const fetchData = type === "campus" ? fetchLocations : fetchDishes;
    const data = await fetchData(id);
    cacheType[id] = data;
    return data;
  }

  throw new Error(`Error: cache type ${type} does not exist`);
}
