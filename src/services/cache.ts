import { Dish } from "../components/ContentContainer";
import { Location } from "../components/ContentContainer";
import { fetchDishes, fetchLocations } from "./api";

interface Cache {
  location: { [id: number]: Location[] };
  dish: { [id: number]: Dish[] };
}

export const cache: Cache = { location: {}, dish: {} };

export default async function queryThroughCache(query: string) {
  const [type, idString] = query.split(".");
  const id = parseInt(idString);

  if (type === "location" || type === "dish") {
    const cacheType = cache[type];

    if (id in cacheType) {
      return cacheType[id];
    }

    const fetchData = type === "location" ? fetchLocations : fetchDishes;
    const data = await fetchData(id);
    cacheType[id] = data;
    return data;
  }

  throw new Error(`Error: cache type ${type} does not exist`);
}
