import { ObjectId } from "mongodb";
import { DataResonse, BlackList } from "../types/database";
import { databaseClient } from "./database";

// get all blacklists by user id
const getBlacklistsByUserId = async (user_id: ObjectId): Promise<DataResonse<BlackList[]>> => {
  try {
    const result = await databaseClient.collection<BlackList>("blacklists").find({ user_id }).toArray();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to get blacklist",
    };
  }
};

// add a new blacklist
const addBlacklist = async (user_id: ObjectId, fortnite_id: string, reason: string): Promise<DataResonse<string>> => {
  try {
    const result = await databaseClient.collection<Omit<BlackList, "_id">>("blacklists").insertOne({
      user_id,
      fortnite_id,
      reason,
    });
    return {
      success: true,
      data: result.insertedId.toJSON(),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to add blacklist",
    };
  }
};

// delete a blacklist
const deleteBlacklist = async (user_id: ObjectId, fortnite_id: string): Promise<DataResonse<BlackList>> => {
  try {
    const result = await databaseClient.collection<BlackList>("blacklists").findOneAndDelete({ user_id, fortnite_id });
    return {
      success: true,
      data: result.value,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete blacklist",
    };
  }
};

// update a blacklist
const updateBlacklist = async (user_id: ObjectId, fortnite_id: string, reason: string): Promise<DataResonse<BlackList>> => {
  try {
    const result = await databaseClient.collection<BlackList>("blacklists").findOneAndUpdate({ user_id, fortnite_id }, { $set: { reason: reason } }, { upsert: true });
    return {
      success: true,
      data: result.value,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to update blacklist",
    };
  }
};

export { getBlacklistsByUserId, addBlacklist, deleteBlacklist, updateBlacklist };
