export const NODE_ENV = process.env.NODE_ENV || ("development" as "development" | "production");

export const IS_DEV = NODE_ENV === "development";

export const FORTNITE_API_URL = IS_DEV ? "http://127.0.0.1:3000/fortnite-items.json" : "https://fortnite-api.com/v2/cosmetics/br";

export const TOKEN_KEY = "gNsoSwZqLqhk7sS3muVrkQIUzKUpPRZk";

export const FORTNITE_API_KEY = "6af32110-2611-4c2d-bbad-3ff6b722668f";
