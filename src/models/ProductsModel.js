const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      // unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      ref: "Brand",
      // required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewCount: {
      type: Number,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      // required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    isInWishlist: {
      type: Boolean,
      default: false,
    },
    features: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Product", productSchema);
