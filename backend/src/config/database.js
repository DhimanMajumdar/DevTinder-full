const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dhimanmajumdar08233:WQhucqIpOyqSPMd9@cluster0.vuvkvjj.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDB;
