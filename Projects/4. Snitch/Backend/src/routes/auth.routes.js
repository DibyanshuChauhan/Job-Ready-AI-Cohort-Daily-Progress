import { Router } from "express";
import { validateLogin, validateRegisterUser } from "../validator/auth.validator.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validateRegisterUser, registerUser);

router.post("/login", validateLogin, loginUser);

export default router;