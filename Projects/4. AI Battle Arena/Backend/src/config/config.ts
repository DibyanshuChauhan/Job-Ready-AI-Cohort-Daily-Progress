import dotenv from "dotenv";
dotenv.config();

const config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  MISTRALAI_API_KEY: process.env.MISTRALAI_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",

  MONGO_URI:
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/ai-battle-arena",

  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

  JWT_SECRET: process.env.JWT_SECRET || "changeme_jwt_secret_32chars_min",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  SESSION_SECRET: process.env.SESSION_SECRET || "changeme_session_secret",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_CALLBACK_URL:
    process.env.GOOGLE_CALLBACK_URL ||
    "https://job-ready-ai-cohort-daily-progress-2.onrender.com/auth/google/callback",

  FRONTEND_URL:
    process.env.FRONTEND_URL ||
    "https://job-ready-ai-cohort-daily-progress.vercel.app",
};

export default config;