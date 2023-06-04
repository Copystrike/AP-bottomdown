import { ObjectId } from "mongodb";
import { DataResonse, Favorite } from "../types/database";
import { databaseClient } from "./database";

// get all favorites by user id
const getFavoritesByUserId = async (user_id: ObjectId): Promise<DataResonse<Favorite[]>> => {
  try {
    const result = await databaseClient.collection<Favorite>("favorites").find({ user_id: user_id }).toArray();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to get favorite",
    };
  }
};

// add a new favorite
const addFavorite = async (user_id: ObjectId, fortnite_id: string): Promise<DataResonse<string>> => {
  try {
    const result = await databaseClient.collection<Omit<Favorite, "_id">>("favorites").insertOne({
      user_id,
      fortnite_id,
    });
    return {
      success: true,
      data: result.insertedId.toJSON(),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to add favorite",
    };
  }
};

// delete a favorite
const deleteFavorite = async (user_id: ObjectId, fortnite_id: string): Promise<DataResonse<string>> => {
  try {
    const result = await databaseClient.collection<Favorite>("favorites").findOneAndDelete({ user_id, fortnite_id });
    return {
      success: true,
      data: result.value?._id.toJSON(),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete favorite",
    };
  }
};

export { getFavoritesByUserId, addFavorite, deleteFavorite };
