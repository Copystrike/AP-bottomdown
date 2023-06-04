import { ObjectId } from "mongodb";
// import { DataResonse, Notes } from "../types/database";
import { databaseClient } from "./database";
import { DataResonse, LinkedItem } from "../types/database";

const getLinkedItemsByUserIdAndFortniteId = async (user_id: ObjectId, fortnite_id: string): Promise<DataResonse<LinkedItem[]>> => {
  try {
    const result = await databaseClient.collection<LinkedItem>("linkedItem").find({ user_id, fortnite_id }).toArray();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to get linkedItem",
    };
  }
};

const setLinkedItem = async (user_id: ObjectId, fortnite_id: string, item_id: string, slot: number): Promise<DataResonse<LinkedItem>> => {
  try {
    const result = await databaseClient.collection<LinkedItem>("linkedItem").findOneAndUpdate({ user_id, fortnite_id, slot }, { $set: { slot, item_id } }, { upsert: true });
    return {
      success: true,
      data: result.value,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to set linkedItem",
    };
  }
};

const deleteLinkedItem = async (user_id: ObjectId, id: ObjectId): Promise<DataResonse<LinkedItem>> => {
  try {
    const result = await databaseClient.collection<LinkedItem>("linkedItem").findOneAndDelete({ user_id, _id: id });
    return {
      success: true,
      data: result.value,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete linkedItem",
    };
  }
};

export { getLinkedItemsByUserIdAndFortniteId, setLinkedItem, deleteLinkedItem };
