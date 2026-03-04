import express from "express";
import {
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

export default router;
