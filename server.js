require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

const adminAuth = require("./src/routes/admin/AdminAuth");
const profile = require("./src/routes/admin/Profile");
const adminProducts = require("./src/routes/admin/ProductRoute");
const adminCategory = require("./src/routes/admin/CategoryRoute");
const adminBrand = require("./src/routes/admin/BrandRoute");
const adminBanners = require("./src/routes/admin/BannerRoute");

const userAuth = require("./src/routes/web/userAuth");
const profileWeb = require("./src/routes/web/profile");
const webProducts = require("./src/routes/web/productRoute");
const webAddress = require("./src/routes/web/addressRoute");
const webCart = require("./src/routes/web/cartRoute");
const webWishlist = require("./src/routes/web/wishlistRoute");
const webBanner = require("./src/routes/web/bannerRouteWeb");

const { adminMiddleware } = require("./src/middlewares/admin/adminMidd");
const { webMiddleware } = require("./src/middlewares/web/webMidd");
const generateMockProduct = require("./src/helper/generateMockProduct");

app.use(cors());
app.use(bodyParser.json());

// *********************** Admin Routes *****************************
app.use("/api/admin", adminAuth);
app.use("/api/admin", adminMiddleware, profile);
app.use("/api/admin/products", adminMiddleware, adminProducts);
app.use("/api/admin/category", adminMiddleware, adminCategory);
app.use("/api/admin/brand", adminMiddleware, adminBrand);
app.use("/api/admin/banner", adminMiddleware, adminBanners);

// *********************** User/web Routes *****************************
app.use("/api/web", userAuth);
app.use("/api/web/banner", webBanner);
app.use("/api/web/products", webProducts);
app.use("/api/web", webMiddleware, profileWeb);
app.use("/api/web/address", webMiddleware, webAddress);
app.use("/api/web/cart", webMiddleware, webCart);
app.use("/api/web/wishlist", webMiddleware, webWishlist);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    // await generateMockProduct();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

startServer();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
