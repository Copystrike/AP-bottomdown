import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId,
    username: string,
    hashedPasword: string,
}

export interface Favorite {
    _id: ObjectId,
    user_id: ObjectId,
    
    fortnite_id: string,
}

// We willen meerdere favorieten kunnen toevoegen aan een fortnite_id
export interface Favorite_Fortnite_mapping {
    _id: ObjectId,
    user_id: ObjectId,
    favorite_id: ObjectId,

    fortnite_id: string,
}

export interface BlackList {
    _id: ObjectId,
    user_id: ObjectId,

    fortnite_id: string,
    reason: string,
}

export interface Stats {
    _id: ObjectId,
    user_id: ObjectId,

    fortnite_id: string,
    wins: number,
    losses: number,
}

export interface Notes {
    _id: ObjectId,
    user_id: ObjectId,

    fortnite_id: string,
    note: string,
}

export interface DataResonse<T> {
    success: boolean;
    data?: T | null;
    error?: string;
}