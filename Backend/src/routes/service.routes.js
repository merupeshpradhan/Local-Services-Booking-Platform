import express from "express";
import {
  createService,
  getAllServices,
  getSingleService,
} from "../controllers/service.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔓 Public Routes
router.get("/", getAllServices);
router.get("/:id", getSingleService);

// 🔒 Protected Route (Provider only)
router.post("/", verifyJWT, createService);

export default router;
