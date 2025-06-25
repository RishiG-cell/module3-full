const Usermodel = require("../models/User.model");

const router = require("express").Router();

router.get("/user/:userId", async (req, res) => {
  try {
    const loggedUser = await Usermodel.findById(req.params.userId);
    res.status(200).json(loggedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
