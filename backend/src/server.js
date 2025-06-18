const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully!!");
  } catch (error) {
    res.status(400).send("Error saving the user data", error.message);
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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong!!");
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
