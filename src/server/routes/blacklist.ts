import { getProfile } from "../utils";
import { getFavoritesByUserId } from "../../database/queryFavorites";
import { Request, Response } from "express";
import { getBlacklistsByUserId } from "../../database/queryBlacklist";

const express = require("express");
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const profile = getProfile(req)!; // Unauthorized errors worden behandeld in de middleware

    const { error, data } = await getBlacklistsByUserId(profile?._id);

    if (error) {
        return res.redirect("/error");
    }

    try {
        res.render("blacklist", { items: data });
    } catch (error) {
        console.error(error);
        res.send("Error!");
    }
});

module.exports = router;
