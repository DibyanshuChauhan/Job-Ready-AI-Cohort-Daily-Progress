import express from "express";
import useGraph from "./services/graph.ai.service.js"

const app = express();

// Heath check endpoint
app.get("/", (req, res) => {
    res.send("Hello World!...");
})

app.post("/use-graph", async (req, res) => {
    await useGraph("Write a program in Javascript to calculate the factorial of a number the program should be well optimized and should be able to handle large numbers and also should be able to handle negative numbers and should return the factorial of the number if the number is positive and should return 1 if the number is 0 and should return -1 if the number is negative and also handle the edge cases with the minimum time and space complexity."); 
});

export default app;