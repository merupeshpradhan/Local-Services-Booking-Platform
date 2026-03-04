import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
    },
    phone: { type: String },
    city: { type: String },
    isApproved: { type: Boolean, default: false }, // For provider approval
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
