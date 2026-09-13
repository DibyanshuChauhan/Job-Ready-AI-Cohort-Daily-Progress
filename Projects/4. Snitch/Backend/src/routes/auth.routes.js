import { Router } from "express";
import {
    validateLogin,
    validateRegisterUser,
} from "../validator/auth.validator.js";
import {
    googleAuthCallback,
    loginUser,
    registerUser,
} from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.post("/register", validateRegisterUser, registerUser);

router.post("/login", validateLogin, loginUser);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleAuthCallback,
);

export default router;
