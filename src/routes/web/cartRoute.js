const express = require("express");
const { errorResponse, successResponse } = require("../../utils/globals");
const CartModel = require("../../models/CartModel");
const ProductsModel = require("../../models/ProductsModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { _id } = req?.user;
  const { items } = req.body;

  try {
    let cart = await CartModel.findOne({ userId: _id, status: "active" });

    if (!cart) {
      cart = new CartModel({ userId: _id, items: [] });
    }

    for (let newItem of items) {
      const product = await ProductsModel.findById(newItem.product);
      if (!product) {
        return errorResponse(res, "Product not found", 404);
      }

      const existingItem = cart.items.find(
        (item) => item.product.toString() === newItem.product
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        cart.items.push({
          product: newItem.product,
          quantity: newItem.quantity,
          priceAtTime: product.price,
        });
      }
    }

    await cart.save();
    return successResponse(res, "Product Added successfully", 200);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

router.get("/", async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await CartModel.find({ userId: _id })
      .select("-userId")
      .populate("items.product");
    if (cart) {
      return successResponse(res, "Cart found successfully", 200, cart);
    } else {
      return successResponse(res, "Cart is empty", 200, null);
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

router.post("/increase-quantity", async (req, res) => {
  const { cartId, productId, quantity } = req.body;
  if (!cartId || !productId || !quantity) {
    return errorResponse(res, "Invalid request", 400);
  }
  try {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      {
        $inc: { "items.$.quantity": quantity },
      }
      // { new: true }
    );
    return successResponse(res, "Quantity increased successfully", 200, cart);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

module.exports = router;
