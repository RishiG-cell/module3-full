const router = require("express").Router();
const Usermodel = require("../models/User.model");
const bcryptjs = require("bcryptjs");

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
        res.status(200).json({ message: "Sign in succesfull" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
