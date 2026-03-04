import express from "express";
const router = express.Router();

// Controllers placeholder
import {
  createBooking,
  getBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

// Routes
router.post("/", protect, createBooking); // Customer creates booking
router.get("/", protect, getBookings); // Get bookings (role-based)
router.put("/:id/status", protect, updateBookingStatus); // Update status (provider/admin)

export default router;
