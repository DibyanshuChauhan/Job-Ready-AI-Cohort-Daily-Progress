import express from "express";
import cors from "cors";
import { arenaRouter } from "./arena/routes/arena.routes.js";
import { errorMiddleware } from "./common/middlewares/error.middleware.js";

const app = express();

// CORS configuration for local and staging environments
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middleware to parse incoming JSON payloads
app.use(express.json());

// API v1 Versioned Routes
app.use("/api/v1/arena", arenaRouter);
app.use("/api/v1", arenaRouter);

// Fallback aliases for backward compatibility
app.use("/api/arena", arenaRouter);
app.use("/", arenaRouter);

// Global production error handling middleware
app.use(errorMiddleware);

export default app;