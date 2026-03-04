import express from "express";
const router = express.Router();

// Controllers placeholder
import {
  getProviderProfile,
  updateProviderProfile,
  toggleAvailability,
} from "../controllers/providerController.js";
import { protect } from "../middleware/authMiddleware.js";

// Routes
router.get("/:id", protect, getProviderProfile);
router.put("/:id", protect, updateProviderProfile);
router.put("/:id/availability", protect, toggleAvailability);

export default router;
