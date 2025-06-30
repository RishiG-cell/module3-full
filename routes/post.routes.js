const router = require("express").Router();
const postModel = require("../models/Post.model");
const uploader = require("../middelware/cloudinary.config");

router.post("/create", uploader.single("imageUrl"), async (req, res) => {
  try {
    const newPost = await postModel.create({
      ...req.body,
      image: req.file?.path,
    });
    const foundPost = await postModel.findById(newPost._id).populate("user");
    res.status(201).json(foundPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("update/:postId", uploader.single("imageUrl"), async (req, res) => {
  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.postId,
      { ...req.body, image: req.file?.path },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get("/feed", async (req, res) => {
  try {
    const allPosts = await postModel
      .find()
      .populate("user", "username")
      .select("username image post likes")
      .sort({ createdAt: -1 });
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
      .populate("user");
    res.status(200).json(usersPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, { errorMessage: "no posts" });
  }
});

router.delete("/delete/:postId", async (req, res) => {
  try {
    const deletedPost = await postModel.findByIdAndDelete(req.params.postId);

    res.status(200).json(deletedPost, { new: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error, { errorMessage: "not succesful" });
  }
});

router.post("/liked/:postId", async (req, res) => {
  try {
    const Liked = await postModel
      .findByIdAndUpdate(
        req.params.postId,
        {
          $inc: { likes: 1 },
        },
        { new: true }
      )
      .populate("user", "username")
      .select("username image post likes");
    res.status(201).json(Liked);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, { errorMessage: "notliked" });
  }
});

module.exports = router;
