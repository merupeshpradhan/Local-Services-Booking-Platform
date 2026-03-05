import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/bookings", bookingRoutes);

// Error handler (last middleware)
import errorMiddleware from "./middlewares/error.middleware.js";

app.use(errorMiddleware);

export { app };
