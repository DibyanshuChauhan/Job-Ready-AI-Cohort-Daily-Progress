/*
Controller

Controllers contain the business logic.

Responsibilities:

✔ Receive Request
✔ Perform Database Operations
✔ Validate Data
✔ Send Response
✔ OR pass errors to Error Middleware
*/

export const registerUser = async (req, res, next) => {

    try {

        /*
        Imagine we accidentally use a variable
        that doesn't exist.

        Since "user" was never declared,

        JavaScript throws

        ReferenceError:
        user is not defined
        */

        console.log(user);

        /*
        This line never executes because
        JavaScript already throws an error.
        */

    }

    catch (error) {

        /*
        We can attach our own HTTP Status Code
        to the Error Object.

        409 = Conflict

        This status will later be used
        by Error Middleware.
        */

        error.status = 409;

        /*
        next(error)

        VERY IMPORTANT

        Instead of sending the response here,

        we pass the error to Express.

        Express automatically skips all
        remaining middleware/routes
        and calls handleError().
        */

        next(error);
    }
};

/*
=====================================================

Execution Flow

try

↓

console.log(user)

↓

ReferenceError

↓

catch(error)

↓

error.status = 409

↓

next(error)

↓

handleError()

=====================================================
*/