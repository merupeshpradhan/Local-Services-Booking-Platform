import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err); // log error for debugging

  // If it's an instance of our custom ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ status: "error", message: messages.join(", ") });
  }

  // Default to 500 server error
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;