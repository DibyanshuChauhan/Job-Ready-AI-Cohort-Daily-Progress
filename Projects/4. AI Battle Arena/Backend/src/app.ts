import express from "express";
import { runGraph } from "./AI/graph.ai.js";

const app = express();

// Health check endpoint
app.get("/health", (req, res) => {
    res.send("Hello, World!");
});

app.get("/use-graph", async (req, res) => {
    const result = await runGraph("Explain the concept of Recursion in detail");
    res.json(result);
});

export default app;