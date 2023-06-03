import { getProfile } from "../utils";
import { getFavoritesByUserId } from "../../database/queryFavorites";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const profile = getProfile(req)!; // Unauthorized errors worden behandeld in de middleware

  const { error, data } = await getFavoritesByUserId(profile?._id);

  if (error) {
    return res.redirect("/error");
  }

  try {
    res.render("favorite", { items: data });
  } catch (error) {
    console.error(error);
    res.send("Error!");
  }
});

module.exports = router;
