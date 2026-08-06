import express from "express";
import { runGraph } from "./AI/graph.ai.js";
import { success } from "zod";
import cors from "cors";

const app = express();

// Using cors to allow our frontend to access our backend   
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}))

// Middleware to parse JSON request bodies
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.send("Hello, World!");
});

app.get("/use-graph", async (req, res) => {
    const result = await runGraph("Explain the concept of Recursion in detail");
    res.json(result);
});

app.post("/invoke", async (req, res) => {
    const { input } = req.body;
    const result = await runGraph(input);
    res.status(200).json({
        message: "Graph executed successfully",
        success: true,
        result
    });
});

export default app;