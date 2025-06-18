const express = require("express");
const { webMiddleware } = require("../../middlewares/web/webMidd");
const { errorResponse, successResponse } = require("../../utils/globals");
const AddressModel = require("../../models/AddressModel");

const router = express.Router();

router.post("/add", webMiddleware, async (req, res) => {
  const { addressType, street, city, state, zipCode, country, isDefault } =
    req.body;

  // console.log("user", req?.user);

  const validations = [
    {
      field: "addressType",
      value: addressType,
      message: "Address type is required",
    },
    {
      field: "street",
      value: street,
      message: "Street is required",
    },
    {
      field: "zipCode",
      value: zipCode,
      message: "Zip code is required",
    },
    {
      field: "country",
      value: country,
      message: "Country is required",
    },
  ];
  for (let validation of validations) {
    if (!validation.value) {
      return errorResponse(res, validation.message, 400);
    }
  }
  try {
    if (isDefault === true) {
      await AddressModel.updateMany(
        { userId: req.user._id, isDefault: true },
        {
          isDefault: false,
        }
      );
    }
    const address = await AddressModel.create({
      addressType,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault: !!isDefault,
      userId: req?.user?._id,
    });
    await address.save();
    return successResponse(res, "Address added successfully", 201, address);
  } catch (error) {
    console.log("error", error);
    return errorResponse(res, error.message, 500);
  }
});

router.get("/", webMiddleware, async (req, res) => {
  try {
    const addresses = await AddressModel.find({
      userId: req?.user?._id,
    }).sort({ createdAt: -1 });
    return successResponse(
      res,
      "Addresses retrieved successfully",
      200,
      addresses
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

module.exports = router;
