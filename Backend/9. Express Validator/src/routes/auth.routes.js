import { Router } from "express";

// Import Controller
import { registerUser } from "../controllers/auth.controller.js";

// Import Validation Middleware
import { registerValidion } from "../validation/auth.validator.js";

/*
Create Router Object

Router helps us organize
routes into separate files.
*/

const authRouter = Router();

/*
--------------------------------------------------------

POST /api/auth/register

Middlewares execute
from LEFT to RIGHT.

Step 1

registerValidation

↓

Checks

• username
• email
• password

If validation succeeds

↓

next()

↓

registerUser()

If validation fails

↓

400 Response

Controller never executes.

--------------------------------------------------------
*/

authRouter.post(
    "/register",
    registerValidion,
    registerUser
);

export default authRouter;

/*
=========================================================

FLOW

Client

↓

POST /register

↓

registerValidation

↓

Validation Passed?

YES ─────────► registerUser()

NO ─────────► Send 400 Error

=========================================================
*/