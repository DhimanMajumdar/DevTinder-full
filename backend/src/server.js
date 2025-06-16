const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Dhiman", lastName: "Majumdar" });
});

app.post("/user", (req, res) => {
  res.send("Saving data to db");
});
app.use("/test", (req, res) => {
  res.send("test from the server");
});

app.listen(7777, () => {
  console.log("Server is listeing successfully");
});
