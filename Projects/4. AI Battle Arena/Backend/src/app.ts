import express from "express";
import cors from "cors";
import { arenaRouter } from "./features/arena/arena.routes.js";
import { errorMiddleware } from "./common/middlewares/error.middleware.js";

const app = express();

// CORS configuration for local and staging environments
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Mount feature routers (supports both /api/arena and root /invoke for backward compatibility)
app.use("/api/arena", arenaRouter);
app.use("/", arenaRouter);

// Global production error handling middleware
app.use(errorMiddleware);

export default app;