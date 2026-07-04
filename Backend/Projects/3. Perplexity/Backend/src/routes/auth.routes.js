import { Router } from "express";
import { registerController, verifyEmail } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerController);

authRouter.get("/verify-email", verifyEmail)

export default authRouter;
