const Usermodel = require("../models/User.model");
const uploader = require("../middelware/cloudinary.config");
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

router.put("/update/:userId", uploader.single("imageUrl"), async (req, res) => {
  try {
    const updatedUser = await Usermodel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { image: req.file?.path },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
