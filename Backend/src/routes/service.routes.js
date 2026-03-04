import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getSingleService,
  updateService,
} from "../controllers/service.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔓 Public Routes
router.get("/", getAllServices);
router.get("/:id", getSingleService);

// 🔒 Protected Route (Provider only)
router.post("/", verifyJWT, createService);
router.put("/:id", verifyJWT, updateService);
router.delete("/:id", verifyJWT, deleteService);

export default router;
