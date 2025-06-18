const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
