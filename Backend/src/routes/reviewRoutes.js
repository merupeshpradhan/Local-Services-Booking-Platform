import express from "express";
const router = express.Router();

// Controllers placeholder
import { createReview, getReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

// Routes
router.post("/", protect, createReview);
router.get("/provider/:providerId", getReviews); // Get reviews of a provider

export default router;
