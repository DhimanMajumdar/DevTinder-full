const express = require("express");
const connectDB = require("./config/database.js");

const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
