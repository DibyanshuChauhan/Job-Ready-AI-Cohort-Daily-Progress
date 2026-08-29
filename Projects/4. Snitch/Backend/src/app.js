import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Import routes
import authRouter from "./routes/auth.routes.js";

const app = express();

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for logging HTTP requests
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Use the imported routes
app.use("/api/auth", authRouter);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
    status: "OK",
    message: "Snitch API is running!",
});
});

export default app;
