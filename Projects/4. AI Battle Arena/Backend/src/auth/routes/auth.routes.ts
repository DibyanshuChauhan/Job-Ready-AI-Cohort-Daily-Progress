import { Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
  handleValidationErrors,
} from "../validators/auth.validator.js";

// ── Import strategy so it registers itself with passport ──
import "../strategies/google.strategy.js";

const router = Router();

// ── Local auth ──────────────────────────────────────────────────────────────
// POST /api/v1/auth/register
router.post(
  "/register",
  registerValidator,          // express-validator chain
  handleValidationErrors,     // collect & throw validation errors
  AuthController.register
);

// POST /api/v1/auth/login
router.post(
  "/login",
  loginValidator,
  handleValidationErrors,
  AuthController.login
);

// GET /api/v1/auth/me
router.get("/me", AuthController.me);

// POST /api/v1/auth/logout
router.post("/logout", AuthController.logout);

// ── Google OAuth ────────────────────────────────────────────────────────────
// GET /auth/google — redirect to Google consent screen
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// GET /auth/google/callback — Google redirects here after user consent
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,         // we use JWT, not passport sessions
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=google`,
  }),
  AuthController.googleCallback
);

export const authRouter = router;
