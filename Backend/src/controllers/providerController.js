import ProviderProfile from "../models/ProviderProfile.js";

// Get Provider Profile
export const getProviderProfile = async (req, res) => {
  const profile = await ProviderProfile.findOne({
    user: req.params.id,
  }).populate("serviceCategories");
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  res.json(profile);
};

// Update Provider Profile
export const updateProviderProfile = async (req, res) => {
  const profile = await ProviderProfile.findOneAndUpdate(
    { user: req.params.id },
    req.body,
    { new: true, runValidators: true },
  );
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  res.json(profile);
};

// Toggle Availability
export const toggleAvailability = async (req, res) => {
  const profile = await ProviderProfile.findOne({ user: req.params.id });
  if (!profile) return res.status(404).json({ message: "Profile not found" });

  profile.availability = !profile.availability;
  await profile.save();
  res.json({ availability: profile.availability });
};
