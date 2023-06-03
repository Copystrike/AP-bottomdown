import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { TOKEN_KEY } from "../constants";
import { User } from "../types/database";


export const verifyToken = (req: Request, res: Response) => {
    const token = req.cookies["session"];

    if (!token) return false;
    try {
        jwt.verify(token, TOKEN_KEY);
    } catch (err) {
        return false;
    }
    return true;
};


export const getProfile = (req: Request): User | null => {
    const token = req.cookies["session"];

    if (!token) return null;

    try {
        return jwt.verify(token, TOKEN_KEY) as User;
    } catch (err) {
        return null;
    }
};