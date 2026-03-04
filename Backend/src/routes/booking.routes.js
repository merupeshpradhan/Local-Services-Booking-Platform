import express from "express";
import {
  cancelBooking,
  createBooking,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔓 Customer creates booking
router.post("/", verifyJWT, createBooking);

// 🔓 Get bookings for logged-in user (Customer or Provider)
router.get("/", verifyJWT, getUserBookings);

// 🔒 Provider updates booking status
router.put("/:id/status", verifyJWT, updateBookingStatus);

// 🔒 Customer cancels booking
router.put("/:id/cancel", verifyJWT, cancelBooking);

export default router;
