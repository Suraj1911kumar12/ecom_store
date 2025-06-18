const express = require("express");
const { errorResponse, successResponse } = require("../../utils/globals");
const CategoryModel = require("../../models/CategoryModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { name, slug, description, image, isActive } = req.body;

  const validations = [
    { field: "name", value: name, message: "Name is required" },
    // { field: "slug", value: slug, message: "Slug is required" },
    {
      field: "description",
      value: description,
      message: "Description is required",
    },
    { field: "image", value: image, message: "Image is required" },
    { field: "isActive", value: isActive, message: "Is Active is required" },
  ];
  for (let validation of validations) {
    if (!validation.value) {
      return errorResponse(res, 400, validation.message);
    }
  }

  try {
    const response = await CategoryModel.findOne({
      slug: slug,
    });
    if (response) {
      return errorResponse(res, "Category already exists", 400);
    } else {
      const category = new CategoryModel({
        name: name,
        slug: name?.toLowerCase().replace(/\s+/g, "-"),
        description: description,
        image: image,
        isActive: isActive,
      });
      const result = await category.save();
      return successResponse(res, "Category Added Successfully.", 201, result);
    }
  } catch (error) {
    console.log("error", error);
    return errorResponse(res, error.message, 500);
  }
});

router.post("/", async (req, res) => {
  const { page, limit, search, all } = req.body;
  const searchQuery = search
    ? {
        name: { $regex: search, $options: "i" },
      }
    : {};
  try {
    let category;
    const totalCategory = await CategoryModel.find(searchQuery);
    let total = totalCategory.length;
    if (all) {
      category = totalCategory;
    } else {
      category = await CategoryModel.find(searchQuery)
        .skip((page - 1) * limit)
        .limit(limit);
    }
    let data = {
      category: category,
      total: total,
    };
    return successResponse(res, "Category List", 200, data);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req?.params;
  if (!id) {
    return errorResponse(res, "User not found", 404);
  }
  try {
    const category = await CategoryModel.findById({ _id: id });
    if (!category) {
      return errorResponse(res, "Category not found", 404);
    } else {
      return successResponse(res, "Category Found", 200, category);
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req?.params;
  if (!id) {
    return errorResponse(res, "User not found", 404);
  }
  try {
    const category = await CategoryModel.findByIdAndDelete({ _id: id });
    if (!category) {
      return errorResponse(res, "Category not found", 404);
    } else {
      return successResponse(res, "Category Deleted successfully!!", 200);
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});
router.put("/edit", async (req, res) => {
  const { description, image, isActive, id } = req?.body;
  if (!id) {
    return errorResponse(res, "User not found", 404);
  }
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      { _id: id },
      {
        description,
        image,
        isActive,
      }
    );

    if (!category) {
      return errorResponse(res, "Category not found", 404);
    } else {
      const data = {
        ...category.toObject(),
        description,
        image,
        isActive,
      };
      return successResponse(res, "Category Updated successfully!!", 200, data);
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

module.exports = router;
