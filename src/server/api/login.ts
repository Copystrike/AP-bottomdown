import { getUserByUsername, updateUser } from "../../database/queryUser";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../constants";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password is missing" });
  }

  try {
    if (!(username && password)) {
      return res.status(400).send("All input is required");
    }

    const { error, data } = await getUserByUsername(username);

    if (error || !data) {
      return res.status(500).json({ error: "foutief wachtwoord of gebruikersnaam" });
    }

    const validPassword = await bcrypt.compare(password, data.hashedPasword);

    if (data && validPassword) {
      const databaseUser = data;

      const token = jwt.sign({ _id: databaseUser._id, username: databaseUser.username }, TOKEN_KEY, {
        expiresIn: "2h",
      });

      res.cookie("session", token);
      res.status(200).json(data);
      return;
    }

    res.status(400).json({ error: "foutief wachtwoord of gebruikersnaam" });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
