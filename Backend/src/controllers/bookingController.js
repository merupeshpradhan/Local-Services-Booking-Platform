import Booking from "../models/Booking.js";

// Create Booking (Customer)
export const createBooking = async (req, res) => {
  const booking = await Booking.create({ ...req.body, customer: req.user._id });
  res.status(201).json(booking);
};

// Get Bookings (Customer/Provider/Admin)
export const getBookings = async (req, res) => {
  let bookings;
  if (req.user.role === "customer") {
    bookings = await Booking.find({ customer: req.user._id });
  } else if (req.user.role === "provider") {
    bookings = await Booking.find({ provider: req.user._id });
  } else {
    bookings = await Booking.find(); // admin sees all
  }
  res.json(bookings);
};

// Update Booking Status (Provider/Admin)
export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = req.body.status || booking.status;
  await booking.save();

  res.json(booking);
};