const router = require("express").Router();
const commentModel = require("../models/Comment.model");
const postModel = require("../models/Post.model");

router.get("/onepost/:postId", async (req, res) => {
  try {
    const getOnePost = await postModel
      .findById(req.params.postId)
      .populate("comments");
    res.status(200).json(getOnePost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newComment = await commentModel.create(req.body);
    const updatedPost = await postModel
      .findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: newComment._id } },
        { new: true }
      )
      .populate("comments");
    console.log(updatedPost);
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("update/:commentId", async (req, res) => {
  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.delete("/delete/:commentId", async (req, res) => {
  try {
    const deletedComment = await commentModel.findByIdAndDelete(
      req.params.commentId
    );
    res.status(200).json(deletedComment, { new: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error, { errorMessage: "not succesful" });
  }
});

module.exports = router;
