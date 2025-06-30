const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comment: String,
  },
  {
    timestamps: true,
  }
);

const commentModel = model("comment", CommentSchema);
module.exports = commentModel;
