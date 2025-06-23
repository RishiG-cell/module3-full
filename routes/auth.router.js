const router = require("express").Router();
const Usermodel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middelware/jwt.middelware");

router.post("/signup", async (req, res) => {
  try {
    const theSalt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(req.body.password, theSalt);

    const newUser = await Usermodel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await Usermodel.findOne({ username: req.body.username });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "invalid" });
    } else {
      const matchUser = bcryptjs.compareSync(
        req.body.password,
        foundUser.password
      );
      if (!matchUser) {
        res.status(403).json({ errorMessage: "invalid" });
      } else {
        const data = { _id: matchUser._id, username: matchUser.username };
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "24h",
        });
        res.status(200).json({ message: "Sign in succesfull", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  if (req.payload) {
    res.status(200).json({ message: "valid", payload: req.payload });
  } else {
    res.status(400).json({ errorMessage: "payload not here" });
  }
});

module.exports = router;
