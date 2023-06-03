import { DataResonse, User } from "../types/database";
import { databaseClient } from "./database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../constants";

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
    const result = await databaseClient.collection<User>("users").findOne({ username: username.toLocaleLowerCase() });
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

const addUser = async (user: Omit<User, "hashedPasword" | "id" | "token">, password: string): Promise<DataResonse<string>> => {
  user.username = user.username.toLocaleLowerCase();
  try {
    const token = jwt.sign({ username: user.username }, TOKEN_KEY, {
      expiresIn: "2h",
    });
    const hashedPasword = await bcrypt.hash(password, 10);
    const generatedUser: Omit<User, "id"> = {
      ...user,
      token,
      hashedPasword,
    };

    await databaseClient.collection<Omit<User, "id">>("users").insertOne(generatedUser);

    return {
      success: true,
      data: token,
    };
    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to add user",
    };
  }
};

const updateUser = async (id: string, user: Omit<User, "id">): Promise<DataResonse<string>> => {
  user.username = user.username.toLocaleLowerCase();
  try {
    await databaseClient.collection<User>("users").updateOne({ id }, { $set: user });
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to update user",
    };
  }
};

export { getUserById, getUserByUsername, addUser, updateUser };
