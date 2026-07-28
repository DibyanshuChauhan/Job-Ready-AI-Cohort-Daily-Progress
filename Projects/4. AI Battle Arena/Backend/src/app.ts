import express from "express";

const app = express();

// Heath check endpoint
app.get("/", (req, res) => {
    res.send("Hello World!...");
})

export default app;