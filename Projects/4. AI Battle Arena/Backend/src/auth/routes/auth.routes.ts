import { Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/auth.validator.js";

import "../strategies/google.strategy.js";

const router = Router();

// Local auth
router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, AuthController.login);
router.get("/me", AuthController.me);
router.post("/logout", AuthController.logout);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=google`,
  }),
  AuthController.googleCallback
);

export const authRouter = router;
