const express = require("express");
const mongoose = require("mongoose");
const Users = require("../../models/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorResponse, successResponse } = require("../../utils/globals");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, mobile, password, userName } = req.body;
  const validations = [
    { name: "name", value: name, msg: "Name is required" },
    // { name: "username", value: userName, msg: "User Name is required" },
    { name: "email", value: email, msg: "Email is required" },
    {
      name: "mobile",
      value: mobile,
      msg: "Mobile number is required",
    },
    {
      name: "password",
      value: password,
      msg: "Password is required",
    },
  ];
  for (let validation of validations) {
    if (!validation.value) {
      return errorResponse(res, validation.msg, 400);
    }
  }
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User already exists", 400);
    }
    const newUser = new Users({
      name,
      email,
      mobile,
      userName: email,
      password: bcrypt.hashSync(password, 10),
      userType: "user",
    });
    await newUser.save();

    const { password: _, __v, ...userData } = newUser.toObject();
    return successResponse(res, "User created successfully", 201, userData);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await Users.findOne({ userName: userName });
  if (!user) {
    return errorResponse(res, "Invalid username or password", 400);
  }
  if (user.userType !== "user") {
    return errorResponse(res, "Invalid username or password", 400);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return errorResponse(res, "Password is invalid", 400);
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const userObj = user.toObject();
  delete userObj.password;
  const data = {
    ...userObj,
    token,
  };

  return successResponse(res, "Logged in successfully", 200, data);
});

router.post("/check-username", async (req, res) => {
  const { userName } = req.body;
  const existingUser = await Users.findOne({ userName });
  if (existingUser) {
    return errorResponse(res, "Username already exist!!", 400);
  } else {
    return successResponse(res, "Username is available!!", 200);
  }
});

module.exports = router;
