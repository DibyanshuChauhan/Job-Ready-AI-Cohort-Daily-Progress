import { Router } from "express";

// Import controller function
import { registerUser } from "../controllers/auth.controller.js";

// Create Router object
const authRouter = Router();

/*
--------------------------------------------------------
Route Definition

POST /api/auth/register

↓

registerUser()

Whenever this endpoint is hit,
Express executes registerUser().
--------------------------------------------------------
*/

authRouter.post("/register", registerUser);

export default authRouter;

/*
=====================================================

Client

POST /api/auth/register

        │
        ▼

registerUser()

=====================================================
*/