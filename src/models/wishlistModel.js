const mongoose = require("mongoose");
const wishLishModel = new mongoose.Schema(
  {
    items: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", wishLishModel);
