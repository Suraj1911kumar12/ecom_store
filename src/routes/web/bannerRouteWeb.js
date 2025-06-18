const express = require("express");
const { errorResponse, successResponse } = require("../../utils/globals");
const BannerModel = require("../../models/BannerModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const { all, page, limit, search } = req?.body;
  const searchQuery = search
    ? {
        $or: [{ name: { $regex: search, $options: "i" } }],
      }
    : {};
  try {
    let banners;
    let total = await BannerModel.countDocuments();
    if (all) {
      banners = await BannerModel.find(searchQuery).sort({
        createdAt: -1,
      });
    } else {
      banners = await BannerModel.find(searchQuery)
        .skip((page - 1) * limit)
        .limit(limit);
    }
    const data = {
      total,
      banners,
    };
    return successResponse(res, "Banners fetched successfully", 200, data);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await BannerModel.findById({ _id: id });
    if (!banner) {
      return errorResponse(res, "Banner not found", 404);
    } else {
      return successResponse(res, "Banner found", 200, banner);
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

module.exports = router;
