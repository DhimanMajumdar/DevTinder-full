const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    // read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!!");
    }

    // validate the token and // find the user
    const decodedObj = await jwt.verify(token, "DEVTINDER@1234");
    const { _id } = decodedObj;
    //console.log(_id);
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found...");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
};

module.exports = { userAuth };
