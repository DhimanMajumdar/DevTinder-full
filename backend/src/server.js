const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth.js");

const app = express();

// handle auth middleware for all requests types
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("user logged in success!!");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("user data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.listen(7777, () => {
  console.log("Server is listeing successfully");
});
