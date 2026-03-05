import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/ApiResponse.js";

/* -----------------------------------------
   Generate JWT Token
------------------------------------------ */
const generateToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/* -----------------------------------------
   Register User
------------------------------------------ */
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  const user = await User.create({ fullName, email, password, role });
  const token = generateToken(user);

  successResponse(
    res,
    {
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    },
    "User registered successfully",
    201,
  );
});

/* -----------------------------------------
   Login User
------------------------------------------ */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "Invalid email or password");

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new ApiError(400, "Invalid email or password");

  const token = generateToken(user);

  successResponse(
    res,
    {
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    },
    "Login successful",
    200,
  );
});


export const getCurrentUser = asyncHandler(async (req, res) => {
  successResponse(res, { user: req.user }, "User info fetched successfully");
});

/* -----------------------------------------
   Logout User
------------------------------------------ */
export const logoutUser = asyncHandler(async (req, res) => {
  successResponse(res, null, "User logged out successfully", 200);
});
