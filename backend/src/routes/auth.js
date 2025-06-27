const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

// signup api
authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully!!");
  } catch (error) {
    res.status(400).send("Error saving the user data: " + error.message);
  }

  // creating a new instance of the User model
  // const user = new User({
  //   firstName: "Virat",
  //   lastName: "Kohli",
  //   emailId: "virat@kohli.com",
  //   password: "virat@123",

  // });
  // await user.save(); // returns a promise
  // res.send("User added successfully!!");
});

// login api
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials!!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // create a JWT token
      const token = await user.getJWT();
      //console.log(token);

      // add the token to cookie and send the response back to the server
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful!!");
    } else {
      throw new Error("Password is not correct!!");
    }
  } catch (error) {
    res.status(400).send("Someting went wrong!!: " + error.message);
  }
});

module.exports = authRouter;
