import { DataResonse, User } from "../types/database";
import { databaseClient } from "./database";

const getUserById = async (id: string): Promise<DataResonse<User>> => {
    try {
        const result = await databaseClient.collection<User>("users").findOne({ id: id });
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to get user"
        };
    }
};

const getUserByUsername = async (username: string): Promise<DataResonse<User>> => {
    try {
        const result = await databaseClient.collection<User>("users").findOne({ username: username });
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Failed to get user"
        };
    }
};

export { getUserById, getUserByUsername };
