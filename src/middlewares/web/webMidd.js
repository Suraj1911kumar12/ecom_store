const jwt = require("jsonwebtoken");
const { errorResponse } = require("../../utils/globals");
const UserModels = require("../../models/UserModels");

const webMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return errorResponse(res, "No Token Provided!!", 401);
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return errorResponse(res, "Unauthorized Access here!!", 401);
    }

    const user = await UserModels.findById(decoded.userId).select("+password");
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    if (user.userType !== "user") {
      console.log("user", user);

      return errorResponse(res, "Unauthorized Access here!!", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    return errorResponse(res, err.message || "Something went wrong!!", 400);
  }
};

module.exports = {
  webMiddleware,
};
