import { Router } from "express";
import {
    validateLogin,
    validateRegisterUser,
} from "../validator/auth.validator.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.post("/register", validateRegisterUser, registerUser);

router.post("/login", validateLogin, loginUser);

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
);

export default router;