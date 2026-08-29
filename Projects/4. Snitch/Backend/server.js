import app from "./src/app.js";
import connectDB from "./src/config/db.js";

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Connect to MongoDB
connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
