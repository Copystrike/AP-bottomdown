export const NODE_ENV = process.env.NODE_ENV || ("development" as "development" | "production");

export const IS_DEV = NODE_ENV === "development";

export const FORTNITE_API_URL = IS_DEV ? "http://127.0.0.1:3000/fortnite-items.json" : "https://fortnite-api.theapinetwork.com/items/list";
