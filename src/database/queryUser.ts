import { DataResonse, User } from "../types/database";
import { databaseClient } from "./database";
import bcrypt from 'bcrypt';

const getUserById = async (id: string): Promise<DataResonse<User>> => {
  try {
    const result = await databaseClient.collection<User>("users").findOne({ id: id });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to get user",
    };
  }
};

const getUserByUsername = async (username: string): Promise<DataResonse<User>> => {
  try {
    const result = await databaseClient.collection<User>("users").findOne({ username: username });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to get user",
    };
  }
};

const addUser = async (user: Omit<User, 'hashedPasword'>, password: string): Promise<DataResonse<string>> => {
  try {
    const hashedPasword = await bcrypt.hash(password, 10);
    const generatedUser: User = {
        ...user,
        hashedPasword,
    };

    const result = await databaseClient.collection<User>("users").insertOne(generatedUser);
    return {
      success: true,
      data: result.insertedId.toJSON(),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to add user",
    };
  }
};
        

export { getUserById, getUserByUsername, addUser };
