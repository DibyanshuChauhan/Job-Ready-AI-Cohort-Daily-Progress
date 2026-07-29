import express from "express";
import useGraph from "./services/graph.ai.service.js"

const app = express();

// Heath check endpoint
app.get("/", (req, res) => {
    res.send("Hello World!...");
})

app.post("/use-graph", async (req, res) => {
    await useGraph("What is the capital of India?") 
});

export default app;