const mongoose = require("mongoose");

const BannerModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Banners", BannerModel);
