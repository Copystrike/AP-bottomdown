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

export interface LinkedItem {
    _id: ObjectId,
    user_id: ObjectId,
    fortnite_id: string,
    item_id: string,
    slot: number
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
    text: string,
}

export interface DataResonse<T> {
    success: boolean;
    data?: T | null;
    error?: string;
}