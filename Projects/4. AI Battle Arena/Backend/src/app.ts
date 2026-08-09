import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import { arenaRouter } from "./arena/routes/arena.routes.js";
import { authRouter } from "./auth/routes/auth.routes.js";
import { errorMiddleware } from "./common/middlewares/error.middleware.js";
import config from "./config/config.js";

const app = express();

app.use(
  cors({
    origin: [config.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use("/api/v1/auth", authRouter);
app.use("/auth", authRouter);

// Arena routes
app.use("/api/v1/arena", arenaRouter);
app.use("/api/v1", arenaRouter);

// Error handler
app.use(errorMiddleware);

export default app;