import mongoose from "mongoose";

const providerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to User
    bio: { type: String },
    phone: { type: String },
    city: { type: String },
    serviceCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ServiceCategory" },
    ], // services provider offers
    availability: { type: Boolean, default: true }, // toggle available/unavailable
    ratingsAverage: { type: Number, default: 0 },
    ratingsQuantity: { type: Number, default: 0 },
    beforeImages: [{ type: String }], // Array of image URLs
    afterImages: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.model("ProviderProfile", providerProfileSchema);
