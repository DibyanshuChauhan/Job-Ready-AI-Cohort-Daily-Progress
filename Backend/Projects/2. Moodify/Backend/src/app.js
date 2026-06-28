const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")

const authRouter = require("./routes/auth.routes");
const songRouter = require("./routes/song.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://job-ready-ai-cohort-daily-progress-2.onrender.com",
    credentials: true,
  }),
);

app.use(express.static("./public"));

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);

module.exports = app;
