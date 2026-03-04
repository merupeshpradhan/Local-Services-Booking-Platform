import Service from "../models/Service.model.js";

// 🔹 Create Service (Provider Only)
export const createService = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // Check if user is provider
    if (req.user.role !== "provider") {
      return res.status(403).json({
        message: "Only providers can create services",
      });
    }

    const service = await Service.create({
      title,
      description,
      price,
      category,
      provider: req.user._id, // from JWT middleware
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

// 🔹 Get All Services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "fullName email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Services fetched successfully",
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

// 🔹 Get Single Service
export const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id).populate(
      "provider",
      "fullName email role",
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message: "Service fetched successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch service",
      error: error.message,
    });
  }
};

// 🔹 Update Service (Provider Only)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find service by ID
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Check ownership
    if (service.provider.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own services" });
    }

    // Apply updates
    Object.assign(service, updates);
    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};
