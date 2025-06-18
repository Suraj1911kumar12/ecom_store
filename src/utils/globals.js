const errorResponse = (res, message = "Something Went Wrong!!", status) => {
  return res.status(status).json({
    message,
    status,
  });
};

const successResponse = (
  res,
  message = "Successfully fetched",
  status = 200,
  data = null
) => {
  if (!data)
    return res.status(status).json({
      message,
      status,
    });
  else {
    return res.status(status).json({
      message,
      status,
      data,
    });
  }
};

const slugConverter = (string = "") => {
  if (!string) {
    return "";
  } else {
    return string
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
};

module.exports = {
  errorResponse,
  successResponse,
  slugConverter,
};
