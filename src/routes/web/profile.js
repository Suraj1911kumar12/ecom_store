const express = require("express");
const { adminMiddleware } = require("../../middlewares/admin/adminMidd");
const { errorResponse, successResponse } = require("../../utils/globals");
const UserModels = require("../../models/UserModels");
const router = express.Router();
const bcrypt = require("bcryptjs");
const AddressModel = require("../../models/AddressModel");

router.get("/profile", async (req, res) => {
  try {
    const user = await UserModels.findById(req.user?._id).select("-password");

    const addresses = await AddressModel.find({
      userId: req.user._id,
      isDefault: true,
    }).select("-userId");
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    const data = {
      ...user.toObject(),
      defaultAddress: addresses?.[0],
    };
    successResponse(res, "Profile fetched successfull!!", 200, data);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

router.post("/change-password", async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    if (newPassword !== confirmPassword) {
      return errorResponse(
        res,
        "New Password and Confirm Password does not match",
        400
      );
    }
    const isValidPassword = await bcrypt.compare(
      oldPassword,
      req.user.password
    );
    console.log("isValidPassword", isValidPassword);
    if (!isValidPassword) {
      return errorResponse(res, "Old Password is incorrect", 400);
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      req.user.password = hashedPassword;
      await req.user.save();

      const userObj = req.user.toObject();
      delete userObj.password;
      return successResponse(
        res,
        "Password changed successfully!!",
        200,
        userObj
      );
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

module.exports = router;
