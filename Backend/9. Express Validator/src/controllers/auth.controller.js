/*
=========================================================

CONTROLLER

Controllers contain
Business Logic.

If validation succeeds,

Express comes here.

Otherwise,

this controller
never executes.

=========================================================
*/

export const registerUser = async (req, res, next) => {

    /*
    At this point,

    username

    email

    password

    are already validated.

    Safe to continue.
    */

    res.status(201).json({

        message: "User registered successfully"

    });

};

/*
=========================================================

Validation Passed

↓

Controller Executes

↓

Send Success Response   

=========================================================
*/