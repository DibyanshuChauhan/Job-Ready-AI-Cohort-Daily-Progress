require('dotenv').config();
const dns = require('dns');
const app = require("./src/app");
const mongoose = require("mongoose");

dns.setServers(['8.8.8.8', '8.8.4.4']);

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI;

const startServer = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed! Server not started.", error);
        process.exit(1);
    }
};

startServer();