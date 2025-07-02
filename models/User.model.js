const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    country: String,
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dgtp5s2en/image/upload/v1750930755/tvgjxftaptrpdp3tuyvy.png",
    },
    posts: { type: Schema.Types.ObjectId, ref: "posts" },
    spotify: {
      type: String,
      default: "https://open.spotify.com/playlist/37i9dQZF1DZ06evO3mC78G",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Usermodel = model("User", userSchema);

module.exports = Usermodel;
