import { WithId } from "mongodb";

export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
}

export interface Favorite {
    id: string,
    user_id: string,
    fortnite_id: string,
}

// We willen meerdere favorieten kunnen toevoegen aan een fortnite_id
export interface Favorite_Fortnite_mapping {
    id: string,
    user_id: string,
    favorite_id: string,
    fortnite_id: string,
}

export interface BlackList {
    id: string,
    user_id: string,
    fortnite_id: string,
    reason: string,
}

export interface Stats {
    id: string,
    user_id: string,
    fortnite_id: string,
    wins: number,
    losses: number,
}

export interface Notes {
    id: string,
    user_id: string,
    fortnite_id: string,
    note: string,
}

export interface DataResonse<T> {
    success: boolean;
    data?: T | null;
    error?: string;
}