import { Router } from "express";
import { validateRegisterUser } from "../validator/auth.validator.js";

const router = Router();

router.post("/register", validateRegisterUser, (req, res) => {
    
});

router.post("/login", (req, res) => {
    
});

export default router;