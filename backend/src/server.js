const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// CORS - This MUST come before routes/middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies/headers
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");
const userRouter = require("./routes/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Start Server after DB connects
connectDB()
  .then(() => {
    console.log("Database Connection established!!");
    app.listen(7777, () => {
      console.log("Server is listening on port: 7777");
    });
  })
  .catch((error) => {
    console.log("Database cannot be connected!!", error);
  });
