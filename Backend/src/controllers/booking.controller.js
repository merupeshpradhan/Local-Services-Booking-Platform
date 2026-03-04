import Booking from "../models/Booking.model.js";
import Service from "../models/Service.model.js";

// 🔹 Create Booking (Customer Only)
export const createBooking = async (req, res) => {
  try {
    const { serviceId, address, date, notes } = req.body;

    // Only customers can create booking
    if (req.user.role !== "customer") {
      return res.status(403).json({
        message: "Only customers can create bookings",
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const booking = await Booking.create({
      service: service._id,
      customer: req.user._id,
      provider: service.provider,
      address,
      date,
      notes,
      price: service.price,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// 🔹 Get All Bookings for User
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [{ customer: req.user._id }, { provider: req.user._id }],
    })
      .populate("service", "title price")
      .populate("customer", "fullName email")
      .populate("provider", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// 🔹 Update Booking Status (Provider Only)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only the provider of the service can update status
    if (booking.provider.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the provider can update the booking status" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

// 🔹 Cancel Booking (Customer Only)
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only the customer of the booking can cancel
    if (booking.customer.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the customer can cancel this booking" });
    }

    // Only allow canceling if booking is not completed
    if (booking.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Completed bookings cannot be cancelled" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};