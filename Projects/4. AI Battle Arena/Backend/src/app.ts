import express from "express";
import { runGraph } from "./AI/graph.ai.js"; "./AI/graph.ai.js";

const app = express();

// Health check endpoint
app.get("/health", (req, res) => {
    res.send("Hello, World!");
});

app.get("/use-graph", async (req, res) => {
    const result = await runGraph("Write an optimized algorithm to find the shortest path in a graph. The algorithm should be efficient and handle large graphs with millions of nodes and edges. Provide a clear explanation of the approach used.");
    res.json(result);
});

export default app;