// Import the Express application.
// This file only starts the server.
// All routes, middleware, and configurations are inside app.js.

import app from "./src/app.js";

// Start the Express server on Port 3000
app.listen(3000, () => {
    console.log("Server is running on Port 3000");
});

/*
=====================================================
FLOW

Client Request
      │
      ▼
server.js
      │
Starts Express Application
      │
      ▼
app.js

=====================================================
*/