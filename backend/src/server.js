const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

// signup api
app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
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
app.post("/login", async (req, res) => {
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

// get profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //console.log(cookies);
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong!!" + error.message);
  }
});

// GET user by email
app.get("/user", async (req, res) => {
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

// sending a connection request

connectDB()
  .then(() => {
    console.log("Database Connection established!!");
    app.listen(7777, () => {
      console.log("Server is listening on port: 7777");
    });
  })
  .catch((error) => {
    console.log("Database cannot be connected!!");
  });
