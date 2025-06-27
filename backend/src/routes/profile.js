const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const User = require("../models/user.js");

// get profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //console.log(cookies);
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong!!" + error.message);
  }
});

// GET user by email
profileRouter.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) res.status(404).send("User not found");
    // console.log(user);
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = profileRouter;
