import { v4 as uuid } from "uuid";

export default function generateKey(userID: number, extension: string) {
  return `${userID}.${uuid()}.${extension}`;
}
