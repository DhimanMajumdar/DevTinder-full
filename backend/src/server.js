const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

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
      res.send("Login successful!!");
    } else {
      throw new Error("Password is not correct!!");
    }
  } catch (error) {
    res.status(400).send("Someting went wrong!!: " + error.message);
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

// Feed API- GET /feed - get all the uers from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// delete the user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) res.send("User doesn't exists!!");
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "skills", "age", "about"];

    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdatedAllowed) {
      throw new Error("Update Not allowed");
    }
    if (data.skills && data?.skills.length > 10) {
      throw new Error("Skills shouldn't be more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong!!" + error.message);
  }
});

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
