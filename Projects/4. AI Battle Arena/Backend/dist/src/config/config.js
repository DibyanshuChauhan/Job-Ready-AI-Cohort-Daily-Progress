import dotenv from "dotenv";
dotenv.config();
const config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRALAI_API_KEY: process.env.MISTRALAI_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    MONGO_URI: process.env.MONGO_URI ||
        process.env.MONGODB_URI ||
        "mongodb://127.0.0.1:27017/ai-battle-arena",
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};
export default config;
//# sourceMappingURL=config.js.map