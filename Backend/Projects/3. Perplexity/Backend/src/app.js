import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path"; 
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({
    origin: "https://job-ready-ai-cohort-daily-progress-2.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE" ],    
}));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

const publicFolderPath = path.join(__dirname, "../public");

app.use(express.static(publicFolderPath));

app.get("*any", (req, res) => {
    res.sendFile(path.join(publicFolderPath, "index.html"));
});

export default app;