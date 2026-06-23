const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "https://job-ready-ai-cohort-daily-progress-2.onrender.com",
        credentials: true,
    })
);

// Serve React Build Files
app.use(express.static(path.join(__dirname, "../public")));

// Routes
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);

// React Router Support (SPA Fallback)
// IMPORTANT: Always keep this at the very end
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;