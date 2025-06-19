const express = require("express");
const router = express.Router();
const { errorResponse, successResponse } = require("../../utils/globals");
const ProductsModel = require("../../models/ProductsModel");

router.post("/", async (req, res) => {
  const { page, limit, search, all } = req.body;

  const searchQuery = search
    ? {
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      }
    : {};
  try {
    let products;
    let total = await ProductsModel.countDocuments();
    console.log("total", total);
    if (all) {
      products = await ProductsModel.find(searchQuery);
    } else {
      products = await ProductsModel.find(searchQuery)
        .skip((page - 1) * limit)
        .limit(limit);
    }

    const data = {
      total: total,
      products,
    };
    if (products.length > 0) {
      return successResponse(res, "Products Fetched Successfully!!", 200, data);
    } else {
      return errorResponse(res, "No Products Found!!", 404, []);
    }
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductsModel.findById(id);
    if (!product) {
      return errorResponse(res, "Product not found!!", 404);
    } else {
      return successResponse(res, "Product found!!", 200, product);
    }
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
});

module.exports = router;
