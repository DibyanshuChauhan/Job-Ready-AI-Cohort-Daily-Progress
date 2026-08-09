import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import { arenaRouter } from "./arena/routes/arena.routes.js";
import { authRouter } from "./auth/routes/auth.routes.js";
import { errorMiddleware } from "./common/middlewares/error.middleware.js";
import config from "./config/config.js";

const app = express();

// Trust reverse proxy (Render / Heroku / Vercel HTTPS termination)
app.set("trust proxy", 1);

const isProduction =
  process.env.NODE_ENV === "production" ||
  !config.FRONTEND_URL.includes("localhost");

const allowedOrigins = [
  config.FRONTEND_URL,
  "https://job-ready-ai-cohort-daily-progress.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Root health check endpoint for Render / monitoring
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "DualMind AI Arena Backend is operational",
    frontendUrl: config.FRONTEND_URL,
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Auth routes
app.use("/api/v1/auth", authRouter);
app.use("/auth", authRouter);

// Arena routes
app.use("/api/v1/arena", arenaRouter);
app.use("/api/v1", arenaRouter);

// Error handler
app.use(errorMiddleware);

export default app;