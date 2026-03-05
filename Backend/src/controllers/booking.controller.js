import Booking from "../models/Booking.model.js";
import Service from "../models/Service.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/ApiResponse.js";

// Create Booking (Customer only)
export const createBooking = asyncHandler(async (req, res) => {
  if (req.user.role !== "customer")
    throw new ApiError(403, "Only customers can create bookings");

  const { serviceId, address, date, notes } = req.body;
  const service = await Service.findById(serviceId);
  if (!service) throw new ApiError(404, "Service not found");

  const booking = await Booking.create({
    service: service._id,
    customer: req.user._id,
    provider: service.provider,
    address,
    date,
    notes,
    price: service.price,
  });

  successResponse(res, booking, "Booking created successfully", 201);
});

// Get bookings for user
export const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    $or: [{ customer: req.user._id }, { provider: req.user._id }],
  })
    .populate("service", "title price")
    .populate("customer", "fullName email")
    .populate("provider", "fullName email")
    .sort({ createdAt: -1 });

  successResponse(res, bookings, "Bookings fetched successfully");
});

// Update Booking Status (Provider only)
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, "Booking not found");
  if (booking.provider.toString() !== req.user._id.toString())
    throw new ApiError(403, "Only provider can update status");

  booking.status = req.body.status;
  await booking.save();

  successResponse(res, booking, "Booking status updated successfully");
});

// Cancel Booking (Customer only)
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, "Booking not found");
  if (booking.customer.toString() !== req.user._id.toString())
    throw new ApiError(403, "Only customer can cancel booking");
  if (booking.status === "Completed")
    throw new ApiError(400, "Completed bookings cannot be cancelled");

  booking.status = "Cancelled";
  await booking.save();

  successResponse(res, booking, "Booking cancelled successfully");
});
