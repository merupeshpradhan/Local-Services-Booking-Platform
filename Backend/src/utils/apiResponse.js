// Standard API Response Helper

export const successResponse = (res, data, message = "Success", code = 200) => {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (
  res,
  message = "Error",
  code = 400,
  errors = null,
) => {
  return res.status(code).json({
    status: "error",
    message,
    errors,
  });
};
