const express = require("express");
const {
  slugConverter,
  errorResponse,
  successResponse,
} = require("../../utils/globals");
const BrandModels = require("../../models/BrandModels");
const router = express.Router("");

router.post("/add", async (req, res) => {
  const { name, logo } = req.body;
  if (!name) {
    return errorResponse(res, "Name is required!!", 400);
  }
  try {
    const slug = slugConverter(name);
    const newBrand = await BrandModels.create({ name, logo, slug });
    return successResponse(res, "Brand is created!!", 201, newBrand);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

router.post("/", async (req, res) => {
  const { all, page, limit, search } = req.body;
  const searchQuery = search
    ? {
        $or: [{ name: { $regex: search, $options: "i" } }],
      }
    : {};
  try {
    const total = await BrandModels.countDocuments();
    let brands;
    if (all) {
      brands = await BrandModels.find(searchQuery).sort({
        createdAt: -1,
      });
    } else {
      brands = await BrandModels.find(searchQuery)
        .skip((page - 1) * limit)
        .limit(limit);
    }
    const data = {
      total,
      brands,
    };
    return successResponse(res, "Brands are fetched!!", 200, data);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return errorResponse(res, "Id is required!!", 400);
  }
  try {
    const response = await BrandModels.findById({ _id: id });
    if (!response) {
      return errorResponse(res, "Brand is not found!!", 404);
    } else {
      return successResponse(
        res,
        "Brand successfully fetched!!",
        200,
        response
      );
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return errorResponse(res, "Id is required!!", 400);
  }
  try {
    const response = await BrandModels.findByIdAndDelete({ _id: id });
    if (!response) {
      return errorResponse(res, "Brand is not found!!", 404);
    } else {
      return successResponse(res, "Brand is deleted!!", 200);
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});
router.put("/edit", async (req, res) => {
  const { id, name, logo, status } = req.body;
  if (!id) {
    return errorResponse(res, "Id is required!!", 400);
  }
  try {
    const response = await BrandModels.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name: name,
        logo: logo,
        isActive: status,
      }
    );

    if (!response) {
      return errorResponse(res, "Brand is not found!!", 404);
    } else {
      const data = {
        ...response.toObject(),
        isActive: status,
      };
      return successResponse(res, "Brand is updated!!", 200, data);
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
});

module.exports = router;
