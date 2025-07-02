const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv").config();

const app = express();

require("./utils/cronjob.js");

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
const initializeSocket = require("./utils/socket.js");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

// Start Server after DB connects
connectDB()
  .then(() => {
    console.log("Database Connection established!!");
    server.listen(process.env.PORT, () => {
      console.log(`Server is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database cannot be connected!!", error);
  });
