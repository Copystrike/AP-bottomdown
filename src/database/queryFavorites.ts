import { DataResonse, Favorite, Favorite_Fortnite_mapping } from "../types/database";
import { databaseClient } from "./database";

// get all favorites by user id
const getFavoritesByUserId = async (user_id: string): Promise<DataResonse<Favorite[]>> => {
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
const addFavorite = async (user_id: string, fortnite_id: string): Promise<DataResonse<string>> => {
  try {
    const result = await databaseClient.collection<Omit<Favorite, "id">>("favorites").insertOne({
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
const deleteFavorite = async (id: string): Promise<DataResonse<Favorite>> => {
  try {
    const result = await databaseClient.collection<Favorite>("favorites").findOneAndDelete({ id: id });
    return {
      success: true,
      data: result.value,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete favorite",
    };
  }
};

// get items of a favorite
const getItemsByFavoriteId = async (favorite_id: string): Promise<DataResonse<Favorite_Fortnite_mapping[]>> => {
  try {
    const result = await databaseClient.collection<Favorite_Fortnite_mapping>("Favorite_Fortnite_mapping").find({ favorite_id: favorite_id }).toArray();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to get items",
    };
  }
};

// add a new item to a favorite
const addItem = async (user_id: string, favorite_id: string, fortnite_id: string): Promise<DataResonse<string>> => {
  try {
    const result = await databaseClient.collection<Omit<Favorite_Fortnite_mapping, "id">>("Favorite_Fortnite_mapping").insertOne({
      favorite_id,
      fortnite_id,
      user_id,
    });
    return {
      success: true,
      data: result.insertedId.toJSON(),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to add item",
    };
  }
};

// delete an item from a favorite
const deleteItem = async (id: string): Promise<DataResonse<Favorite_Fortnite_mapping>> => {
  try {
    const result = await databaseClient.collection<Favorite_Fortnite_mapping>("Favorite_Fortnite_mapping").findOneAndDelete({ id: id });
    return {
      success: true,
      data: result.value,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete item",
    };
  }
};

export { getFavoritesByUserId, addFavorite, deleteFavorite, getItemsByFavoriteId, addItem, deleteItem };
