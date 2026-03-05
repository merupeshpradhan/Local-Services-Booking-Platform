import express from "express";
import {
  cancelBooking,
  createBooking,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import authMiddleware  from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔓 Customer creates booking
router.post("/", authMiddleware , createBooking);

// 🔓 Get bookings for logged-in user (Customer or Provider)
router.get("/", authMiddleware , getUserBookings);

// 🔒 Provider updates booking status
router.put("/:id/status", authMiddleware , updateBookingStatus);

// 🔒 Customer cancels booking
router.put("/:id/cancel", authMiddleware , cancelBooking);

export default router;
