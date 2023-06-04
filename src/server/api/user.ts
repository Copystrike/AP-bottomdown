// Path: src/server/api/avatar.ts

import express from "express";
import { Request, Response } from "express";
import { getUserById, updateUser } from "../../database/queryUser";
import { getProfile } from "../utils";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const profile = getProfile(req)!; // Unauthorized errors worden behandeld in de middleware

    const { error, data } = await getUserById(new ObjectId(profile._id));

    if (error || !data) {
        return res.json({ message: "Internal server error", error });
    }

    const { _id, username, fortnite_id } = data;

    res.json({ _id, username, fortnite_id });
});

router.put("/", async (req: Request, res: Response) => {
    const profile = getProfile(req)!; // Unauthorized errors worden behandeld in de middleware

    const { fortniteCharacterId } = req.body;

    if (!fortniteCharacterId) {
        return res.json({ message: "No fortnite_id provided" });
    }

    const { error, data } = await updateUser(new ObjectId(profile!._id), {
        fortnite_id: fortniteCharacterId,
    });

    if (error || !data) {
        return res.json({ message: "Internal server error", error });
    }

    res.json({ message: "Successfully updated" });
});



module.exports = router;