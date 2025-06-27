const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
      index: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender data is not valid..");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw0qJvxSvkrDQmqofB2_wIOr&ust=1750339065790000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDJlqqH-40DFQAAAAAdAAAAABAK",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default value of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEVTINDER@1234", {
    expiresIn: "7d",
  });
  return token;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
