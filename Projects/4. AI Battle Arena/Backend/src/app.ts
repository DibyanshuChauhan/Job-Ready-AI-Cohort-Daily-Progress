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

// ── CORS ───────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [config.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ── Body parsers ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Cookie parser (needed to read JWT from req.cookies) ───────────────────
app.use(cookieParser());

// ── Session (required by Passport even when using JWT) ────────────────────
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ── Passport ───────────────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());

// ── Auth routes ────────────────────────────────────────────────────────────
// /api/v1/auth  — register, login, me, logout
app.use("/api/v1/auth", authRouter);

// /auth — Google OAuth initiation + callback
// (Google redirects to /auth/google/callback per .env GOOGLE_CALLBACK_URL)
app.use("/auth", authRouter);

// ── Arena routes ───────────────────────────────────────────────────────────
app.use("/api/v1/arena", arenaRouter);
app.use("/api/v1", arenaRouter);

// Fallback aliases for backward compatibility
app.use("/api/arena", arenaRouter);
app.use("/", arenaRouter);

// ── Global error handling ──────────────────────────────────────────────────
app.use(errorMiddleware);

export default app;