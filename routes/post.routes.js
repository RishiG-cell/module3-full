const router = require("express").Router();
const postModel = require("../models/Post.model");

router.post("/create", async (req, res) => {
  try {
    const newPost = await postModel.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/feed", async (req, res) => {
  try {
    const allPosts = await postModel.find().populate("user", "username");
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, { errorMessage: "no posts" });
  }
});

router.get("/feed/:userId", async (req, res) => {
  try {
    const usersPosts = await postModel
      .find({ user: req.params.userId })
      .populate("user comment");
    res.status(200).json(usersPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, { errorMessage: "no posts" });
  }
});

module.exports = router;
