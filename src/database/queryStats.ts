import { ObjectId } from "mongodb";
import { DataResonse, Notes, Stats } from "../types/database";
import { databaseClient } from "./database";

// get stats by user id and fortnite id
const getStatsByUserIdAndFortniteId = async (user_id: ObjectId, fortnite_id: string): Promise<DataResonse<Stats[]>> => {
    try {
        const result = await databaseClient.collection<Stats>("stats").find({ user_id: user_id, fortnite_id: fortnite_id }).toArray();
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to get stats"
        };
    }
};

// add a new stat
const addStat = async (user_id: ObjectId, fortnite_id: string, wins: number, losses: number): Promise<DataResonse<Stats>> => {
    try {
        const result = await databaseClient.collection<Omit<Stats, '_id'>>("stats").insertOne({
            user_id, fortnite_id, wins, losses,
        });
        return {
            success: true,
            data: {
                _id: result.insertedId,
                user_id, fortnite_id, wins, losses,
            }
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to add stat"
        };
    }
};

// delete a stat
const deleteStats = async (id: ObjectId): Promise<DataResonse<Stats>> => {
    try {
        const result = await databaseClient.collection<Stats>("stats").findOneAndDelete({ _id: id });
        return {
            success: true,
            data: result.value
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to delete stat"
        };
    }
};

// update a stat
const updateStats = async (id: ObjectId, wins: number, losses: number): Promise<DataResonse<Stats>> => {
    try {
        const result = await databaseClient.collection<Stats>("stats").findOneAndUpdate({ _id: id }, { $set: { wins: wins, losses: losses } });
        return {
            success: true,
            data: result.value
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to update stat"
        };
    }
};


export { getStatsByUserIdAndFortniteId, addStat, deleteStats, updateStats };