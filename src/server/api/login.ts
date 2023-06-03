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

    const databaseUserResponse = await getUserByUsername(username);

    if (databaseUserResponse.error || !databaseUserResponse.data) {
      return res.status(500).json({ message: "An error occured", error: databaseUserResponse.error });
    }

    const validPassword = await bcrypt.compare(password, databaseUserResponse.data.hashedPasword);

    if (databaseUserResponse.data && validPassword) {
      const token = jwt.sign({ username }, TOKEN_KEY, {
        expiresIn: "2h",
      });

      await updateUser(databaseUserResponse.data.id, {
        ...databaseUserResponse.data,
        token,
      });

      res.cookie("session", token);
      res.status(200).json(databaseUserResponse);
      return;
    }

    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
