const express = require("express");
const router = express.Router();
const { errorResponse, successResponse } = require("../../utils/globals");
const ProductsModel = require("../../models/ProductsModel");

router.post("/add", async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    discount,
    discountedPrice,
    rating,
    reviewCount,
    isNew,
    images,
    colors,
    stock,
    features,
  } = req.body;
  const validations = [
    { name: "name", value: name, message: "Name is required" },
    { name: "brand", value: brand, message: "Brand is required" },
    { name: "category", value: category, message: "Category is required" },
    {
      name: "description",
      value: description,
      message: "Description is required",
    },
    { name: "price", value: price, message: "Price is required" },
    { name: "discount", value: discount, message: "Discount is required" },
    {
      name: "discountedPrice",
      value: discountedPrice,
      message: "Discounted Price is required",
    },
    { name: "rating", value: rating, message: "Rating is required" },
    {
      name: "reviewCount",
      value: reviewCount,
      message: "Review count is required",
    },
    { name: "isNew", value: isNew, message: "isNew flag is required" },
    // { name: "images", value: images, message: "Images are required" },
    { name: "colors", value: colors, message: "Colors are required" },
    { name: "stock", value: stock, message: "Stock is required" },
    { name: "features", value: features, message: "Features are required" },
  ];

  for (let validation of validations) {
    if (!validation.value) {
      return errorResponse(res, validation.message, 400);
    }
  }
  try {
    const existingProduct = await ProductsModel.findOne({
      name: name,
    });
    if (existingProduct) {
      return errorResponse(res, "Product already exists", 400);
    } else {
      const product = new ProductsModel({
        name: name,
        brand: brand,
        category: category,
        description: description,
        price: price,
        discount: discount,
        discountedPrice: discountedPrice,
        rating: rating,
        reviewCount: reviewCount,
        isNew: isNew,
        images: images,
        colors: colors,
        stock: stock,
        features: features,
      });
      product.id = product._id;
      const result = await product.save();
      return successResponse(res, "Product created!!", 201, result);
    }
  } catch (error) {
    console.log("error", error);
    return errorResponse(res, error.message, 400);
  }
});

router.post("/", async (req, res) => {
  const { limit, page, search, all } = req.body;
  const searchQuery = search
    ? {
        $or: [{ name: { $regex: search, $options: "i" } }],
      }
    : {};
  try {
    let products;
    const totalproduct = await ProductsModel.find(searchQuery)
      .populate("category")
      .populate("brand");
    let total = totalproduct?.length;

    if (all) {
      products = await ProductsModel.find(searchQuery)
        .populate("category")
        .populate("brand");
    } else {
      products = await ProductsModel.find(searchQuery)
        .populate("category")
        .populate("brand")
        .skip((page - 1) * limit)
        .limit(limit);
    }
    const data = {
      total,
      products: products,
    };
    return successResponse(res, "Products fetched!!", 200, data);
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
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductsModel.findByIdAndDelete(id);
    if (!product) {
      return errorResponse(res, "Product not found!!", 404);
    } else {
      return successResponse(res, "Product deleted!!", 200);
    }
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
});

router.put("/edit", async (req, res) => {
  const {
    id,
    name,
    brand,
    category,
    description,
    price,
    discount,
    discountedPrice,
    rating,
    reviewCount,
    isNew,
    images,
    colors,
    stock,
    features,
  } = req.body;
  try {
    const product = await ProductsModel.findByIdAndUpdate(id, {
      name,
      brand,
      category,
      description,
      price,
      discount,
      discountedPrice,
      rating,
      reviewCount,
      isNew,
      images,
      colors,
      stock,
      features,
    });
    if (!product) {
      return errorResponse(res, "Product not found!!", 404);
    } else {
      return successResponse(res, "Product updated!!", 200);
    }
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
});

module.exports = router;
