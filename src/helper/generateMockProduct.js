const { default: mongoose } = require("mongoose");
const ProductsModel = require("../models/ProductsModel");
const featuredProducts = require("../utils/dummyProduct");

const generateMockProduct = async () => {
  const objectId = new mongoose.Types.ObjectId();
  const products = featuredProducts.map((product, index) => ({
    // id: objectId.toString(),
    name: product.name,
    brand:
      index % 2 === 0 ? "685151d46968ba8acf8af831" : "6851679325aca5ef52584eb8",
    category:
      index % 2 === 0 ? "684803b28d71f757a0e726bc" : "68480ea9db6b58f13a36af37",
    description: product.description,
    price: product.price,
    discount: product.discount,
    discountedPrice: product.discountedPrice,
    rating: product.rating,
    reviewCount: product.reviewCount,
    isRecentlyAdded: product.isNew || false,
    images: product.images,
    colors: product.colors,
    stock: product.stock,
    features: product.features,
  }));

  try {
    // Optional: Clear existing products first to avoid duplicates
    await ProductsModel.deleteMany({});
    await ProductsModel.insertMany(products);
    console.log(`${products.length} mock products generated successfully!`);
  } catch (error) {
    console.error("Error inserting mock products:", error);
  }
};

module.exports = generateMockProduct;
