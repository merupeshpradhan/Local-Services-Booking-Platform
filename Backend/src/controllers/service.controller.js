import Service from "../models/Service.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { successResponse } from "../utils/ApiResponse.js";

// Create Service
export const createService = asyncHandler(async (req, res) => {
  if (req.user.role !== "provider")
    throw new ApiError(403, "Only providers can create services");

  const { title, description, price, category } = req.body;

  const service = await Service.create({
    title,
    description,
    price,
    category,
    provider: req.user._id,
  });

  successResponse(res, service, "Service created successfully", 201);
});

// Get All Services
export const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find()
    .populate("provider", "fullName email role")
    .sort({ createdAt: -1 });
  successResponse(res, services, "Services fetched successfully");
});

// Get Single Service
export const getSingleService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id).populate(
    "provider",
    "fullName email role",
  );
  if (!service) throw new ApiError(404, "Service not found");

  successResponse(res, service, "Service fetched successfully");
});

// Update Service
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");
  if (service.provider.toString() !== req.user._id.toString())
    throw new ApiError(403, "You can only update your own services");

  Object.assign(service, req.body);
  await service.save();

  successResponse(res, service, "Service updated successfully");
});

// Delete Service
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");
  if (service.provider.toString() !== req.user._id.toString())
    throw new ApiError(403, "You can only delete your own services");

  await service.deleteOne();
  successResponse(res, null, "Service deleted successfully");
});
