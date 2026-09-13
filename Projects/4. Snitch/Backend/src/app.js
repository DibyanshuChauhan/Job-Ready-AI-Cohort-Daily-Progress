import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";

// Import routes
import authRouter from "./routes/auth.routes.js";

const app = express();

// Initialize Passport.js middleware
app.use(passport.initialize());

passport.use(
    new GoogleStrategy(
    {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle the user's profile and authentication
        return done(null, profile);
    },
),
);

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
