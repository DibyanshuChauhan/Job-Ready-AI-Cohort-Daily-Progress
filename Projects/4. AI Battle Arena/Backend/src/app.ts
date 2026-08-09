import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import { arenaRouter } from "./arena/routes/arena.routes.js";
import { authRouter } from "./auth/routes/auth.routes.js";
import { errorMiddleware } from "./common/middlewares/error.middleware.js";
import config from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to frontend static assets (checked in ../public or ../../Frontend/dist)
const publicPath = fs.existsSync(path.join(__dirname, "../public"))
  ? path.join(__dirname, "../public")
  : path.join(__dirname, "../../Frontend/dist");

const app = express();

// Trust reverse proxy (Render / Heroku HTTPS termination)
app.set("trust proxy", 1);

const isProduction =
  process.env.NODE_ENV === "production" &&
  !config.FRONTEND_URL.includes("localhost");

const allowedOrigins = [
  config.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, same-origin)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".onrender.com")
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

// Serve static assets from public/dist directory
app.use(express.static(publicPath));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Auth routes
app.use("/api/v1/auth", authRouter);
app.use("/auth", authRouter);

// Arena routes
app.use("/api/v1/arena", arenaRouter);
app.use("/api/v1", arenaRouter);

// Catch-all SPA route to serve index.html for React Router
app.get("*", (req, res, next) => {
  // Pass through any unrecognized API or Auth routes to 404 / error handler
  if (req.path.startsWith("/api") || req.path.startsWith("/auth")) {
    return next();
  }
  const indexPath = path.join(publicPath, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.json({
    status: "ok",
    message: "DualMind AI Arena Backend is operational",
    frontendUrl: config.FRONTEND_URL,
  });
});

// Error handler
app.use(errorMiddleware);

export default app;