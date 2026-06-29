/*
=========================================================
SERVER.JS

This is the entry point of our application.

Responsibilities:
✔ Start the Express Server
✔ Import the Express App
✔ Listen on a specific Port

Note:
This file DOES NOT contain routes,
controllers or business logic.

Everything is handled inside app.js.
=========================================================
*/

import app from "./src/app.js";

/*
Start the Express server.

Port 3000 means:

http://localhost:3000
*/

app.listen(3000, () => {
    console.log("Server is running on Port 3000");
});

/*
=========================================================

FLOW

Client
   │
   ▼
server.js
   │
Starts Express Server
   │
   ▼
app.js

=========================================================
*/