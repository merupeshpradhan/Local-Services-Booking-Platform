import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serviceCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
    address: String,
    city: String,
    scheduledDate: Date,
    notes: String,
    priceAtBooking: Number,
    status: {
      type: String,
      enum: ["requested", "confirmed", "in-progress", "completed", "cancelled"],
      default: "requested",
    },
    beforeImage: String,
    afterImage: String,
    cancellationReason: String,
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
