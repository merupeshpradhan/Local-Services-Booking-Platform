import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

/* -----------------------------------------
   Generate JWT Token
------------------------------------------ */
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

/* -----------------------------------------
   Register User
------------------------------------------ */
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role, // optional (customer/provider)
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -----------------------------------------
   Login User
------------------------------------------ */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* -----------------------------------------
   Logout User (Simple Version)
------------------------------------------ */
export const logoutUser = async (req, res) => {
  res.status(200).json({
    message: "User logged out successfully",
  });
};
