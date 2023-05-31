import { DataResonse, Notes } from "../types/database";
import { databaseClient } from "./database";

// get all notes by user id and fortnite id
const getNotesByUserIdAndFortniteId = async (user_id: string, fortnite_id: string): Promise<DataResonse<Notes[]>> => {
    try {
        const result = await databaseClient.collection<Notes>("notes").find({ user_id: user_id, fortnite_id: fortnite_id }).toArray();
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to get note"
        };
    }
};

// add a new note
const addNote = async (user_id: string, fortnite_id: string, note: string): Promise<DataResonse<string>> => {
    try {
        const result = await databaseClient.collection<Omit<Notes, 'id'>>("notes").insertOne({
            user_id, fortnite_id, note,
        });
        return {
            success: true,
            data: result.insertedId.toJSON()
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to add note"
        };
    }
};

// delete a note
const deleteNote = async (id: string): Promise<DataResonse<Notes>> => {
    try {
        const result = await databaseClient.collection<Notes>("notes").findOneAndDelete({ id: id });
        return {
            success: true,
            data: result.value
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to delete note"
        };
    }
};

// update a note
const updateNote = async (id: string, note: string): Promise<DataResonse<Notes>> => {
    try {
        const result = await databaseClient.collection<Notes>("notes").findOneAndUpdate({ id: id }, { $set: { note: note } });
        return {
            success: true,
            data: result.value
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to update note"
        };
    }
};

export { getNotesByUserIdAndFortniteId, addNote, deleteNote, updateNote };