const express = require("express");
const { errorResponse, successResponse } = require("../../utils/globals");
const CategoryModel = require("../../models/CategoryModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const { all, page, limit, search } = req?.body;
  const searchQuery = search
    ? {
        $or: [{ name: { $regex: search, $options: "i" } }],
      }
    : {};
  try {
    let categories;
    let total = await CategoryModel.countDocuments();
    if (all) {
      categories = await CategoryModel.find(searchQuery);
    } else {
      categories = await CategoryModel.find(searchQuery)
        .skip(page * limit)
        .limit(limit);
    }
    const data = {
      total,
      categories,
    };
    return successResponse(res, "Categories retrieved successfully", 200, data);
  } catch (error) {
    return errorResponse(res, error?.message, 500);
  }
});

module.exports = router;
