const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const User = require("../models/user.js");
const { validateEditProfileData } = require("../utils/validation.js");

// get profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //console.log(cookies);
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong!!" + error.message);
  }
});

// GET user by email
// profileRouter.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.findOne({ emailId: userEmail });
//     if (user.length === 0) res.status(404).send("User not found");
//     // console.log(user);
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Error is Edit profile");
    }
    const loggedInUser = req.user;
    //console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    //console.log(loggedInUser);
    await loggedInUser.save();
    res.send("Profile updated successfully!");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(loggedInUserId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = profileRouter;
