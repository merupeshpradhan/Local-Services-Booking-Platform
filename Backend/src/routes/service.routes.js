import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getSingleService,
  updateService,
} from "../controllers/service.controller.js";

import authMiddleware  from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔓 Public Routes
router.get("/", getAllServices);
router.get("/:id", getSingleService);

// 🔒 Protected Route (Provider only)
router.post("/", authMiddleware , createService);
router.put("/:id", authMiddleware , updateService);
router.delete("/:id", authMiddleware , deleteService);

export default router;
