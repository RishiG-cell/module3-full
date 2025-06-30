const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dgtp5s2en/image/upload/v1750930755/tvgjxftaptrpdp3tuyvy.png",
    },
    post: String,
    comments: { type: [Schema.Types.ObjectId], ref: "comment" },
    likes: Number,
  },
  {
    timestamps: true,
  }
);

const postModel = model("posts", postSchema);

module.exports = postModel;
