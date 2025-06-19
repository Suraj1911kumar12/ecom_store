const express = require("express");
const { errorResponse, successResponse } = require("../../utils/globals");
const ProductsModel = require("../../models/ProductsModel");
const wishlistModel = require("../../models/wishlistModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { id } = req.user;
  const { items } = req.body;

  if (!items || items.length === 0) {
    return errorResponse(res, "Please add an item to the wishlist", 400);
  }

  try {
    let wishlist = await wishlistModel.findOne({ user: id });

    if (!wishlist) {
      wishlist = new wishlistModel({ user: id, items: [] });
    }

    for (let productId of items) {
      const product = await ProductsModel.findById(productId);
      if (!product) {
        return errorResponse(res, `Product not found: ${productId}`, 404);
      }

      const alreadyInWishlist = wishlist.items.some(
        (item) => item.toString() === productId
      );

      if (alreadyInWishlist) {
        continue;
      }

      wishlist.items.push(productId);
      await ProductsModel.updateOne(
        { _id: productId },
        { $set: { isInWishlist: true } }
      );
    }

    await wishlist.save();

    return successResponse(res, "Wishlist updated successfully", 200, wishlist);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

router.get("/", async (req, res) => {
  const { id } = req.user;
  try {
    let wishlistItems = await wishlistModel.find({ user: id });

    if (!wishlistItems || wishlistItems.length === 0) {
      return errorResponse(res, "No wishlist found", 404);
    } else {
      let data = [];
      for (let item of wishlistItems) {
        value = await ProductsModel.find({ _id: item.items });
        data = [...data, ...value];
      }

      return successResponse(res, "Wishlist found", 200, data);
    }
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
});

module.exports = router;
