import express from "express";

// Import all authentication routes
import authRouter from "./routes/auth.routes.js";

/*
Create Express Application

Everything inside this application
will be executed whenever
a client sends a request.
*/

const app = express();

/*
----------------------------------------------------------

express.json()

This middleware converts JSON data
coming from the client into a JavaScript object.

Without this middleware:

req.body

will be undefined.

Example:

Client sends

{
    "username":"Divyanshu"
}

↓

express.json()

↓

req.body

{
    username: "Divyanshu"
}

----------------------------------------------------------
*/

app.use(express.json());

/*
----------------------------------------------------------

All routes beginning with

/api/auth

will be forwarded to auth.routes.js

Example:

POST /api/auth/register

↓

auth.routes.js

----------------------------------------------------------
*/

app.use("/api/auth", authRouter);

export default app;

/*
=========================================================

FLOW

Client

↓

server.js

↓

app.js

↓

express.json()

↓

auth.routes.js

=========================================================
*/