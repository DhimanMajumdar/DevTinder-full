const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

// sending a connection request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // sending a connection request
  const user = req.user;
  console.log("Sending a Connection request");
  res.send("Connection Request sent by:" + user.firstName);
});

module.exports = requestRouter;
