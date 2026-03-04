import express from "express";
const router = express.Router();

// Controllers placeholder
import { registerUser, loginUser } from "../controllers/authController.js";

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
