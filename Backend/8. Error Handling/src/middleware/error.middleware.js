// Load environment variables from .env file
import dotenv from "dotenv";

dotenv.config();

/*
=====================================================

Global Error Handling Middleware

Whenever any controller calls

next(error)

Express automatically comes here.

This middleware handles ALL errors
from the application.

=====================================================
*/

export const handleError = async (err, req, res, next) => {

    /*
    Create response object.

    Initially,
    only send the error message.
    */

    const response = {
        message: err.message
    };

    /*
    Never expose stack trace in production.

    Stack trace contains

    - File Names
    - Folder Structure
    - Line Numbers
    - Internal Code

    This information should only be visible
    while developing the application.

    Therefore,

    if environment is Development,

    add stack trace.
    */

    if (process.env.NODE_ENVIRONMENT === "development") {

        response.stack = err.stack;

    }

    /*
    Send HTTP Response

    err.status came from

    auth.controller.js

    error.status = 409

    So the response becomes

    Status : 409

    Body:

    {
        message: "...",
        stack: "..."
    }

    */

    res.status(err.status).json(response);
};

/*
=====================================================

Error Flow

Controller

↓

next(error)

↓

Express

↓

handleError()

↓

Create Response

↓

Check Environment

↓

Development?

      │
 ┌────┴────┐
 │         │
Yes       No
 │         │
Add Stack  Hide Stack
 │         │
 └────┬────┘
      ▼

Send JSON Response

=====================================================
*/