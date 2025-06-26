const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    image: String,
    post: String,
    comment: { type: [Schema.Types.ObjectId], ref: "comment" },
  },
  {
    timestamps: true,
  }
);

const postModel = model("posts", postSchema);

module.exports = postModel;
