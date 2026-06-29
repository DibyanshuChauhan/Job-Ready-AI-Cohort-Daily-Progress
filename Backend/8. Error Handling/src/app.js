import express from "express";

// Import all authentication routes
import authRouter from "./routes/auth.routes.js";

// Import Global Error Handling Middleware
import { handleError } from "./middleware/error.middleware.js";

// Create Express Application
const app = express();

/*
--------------------------------------------------------
Route Middleware
--------------------------------------------------------

Every request starting with

/api/auth

will be forwarded to auth.routes.js

Example:

POST /api/auth/register

↓

auth.routes.js
*/
app.use("/api/auth", authRouter);

/*
--------------------------------------------------------
Global Error Middleware

IMPORTANT:

This middleware MUST always be placed AFTER all routes.

Whenever next(error) is called anywhere,
Express skips all remaining middleware
and directly comes here.
--------------------------------------------------------
*/

app.use(handleError);

export default app;

/*
=====================================================

Complete Request Flow

Client
   │
   ▼
server.js
   │
   ▼
app.js
   │
   ▼
auth.routes.js
   │
   ▼
Controller
   │
   ▼
next(error)
   │
   ▼
handleError()
   │
   ▼
Client receives JSON Response

=====================================================
*/