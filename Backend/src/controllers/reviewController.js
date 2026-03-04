import Review from "../models/Review.js";

// Create Review
export const createReview = async (req, res) => {
  const review = await Review.create({ ...req.body, customer: req.user._id });
  res.status(201).json(review);
};

// Get Reviews for a Provider
export const getReviews = async (req, res) => {
  const reviews = await Review.find({
    provider: req.params.providerId,
  }).populate("customer", "fullName");
  res.json(reviews);
};
