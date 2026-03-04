import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔓 Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔒 Protected Routes
router.post("/logout", verifyJWT, logoutUser);

router.get("/profile", verifyJWT, (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

export default router;