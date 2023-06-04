import { ObjectId } from "mongodb";
import { DataResonse, Notes } from "../types/database";
import { databaseClient } from "./database";

// get all notes by user id and fortnite id
const getNotesByUserIdAndFortniteId = async (user_id: ObjectId, fortnite_id: string): Promise<DataResonse<Notes[]>> => {
  try {
    const result = await databaseClient.collection<Notes>("notes").find({ user_id, fortnite_id }).toArray();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to get note",
    };
  }
};

// add a new note
const addNote = async (user_id: ObjectId, fortnite_id: string, text: string): Promise<DataResonse<Notes>> => {
  try {
    const result = await databaseClient.collection<Omit<Notes, "_id">>("notes").insertOne({
      user_id,
      fortnite_id,
      text,
    });
    return {
      success: true,
      data: {
        _id: result.insertedId,
        user_id,
        fortnite_id,
        text,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to add note",
    };
  }
};

// delete a note
const deleteNote = async (user_id: ObjectId, id: ObjectId): Promise<DataResonse<Notes>> => {
  try {
    const result = await databaseClient.collection<Notes>("notes").findOneAndDelete({ user_id, _id: id });
    return {
      success: true,
      data: result.value,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete note",
    };
  }
};

// update a note
const updateNote = async (id: ObjectId, text: string): Promise<DataResonse<Notes>> => {
  try {
    const result = await databaseClient.collection<Notes>("notes").findOneAndUpdate({ _id: id }, { $set: { text } });
    return {
      success: true,
      data: result.value,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to update note",
    };
  }
};

export { getNotesByUserIdAndFortniteId, addNote, deleteNote, updateNote };
