import app from "./src/app.js";
import { Database } from "./src/infrastructure/db/database.js";
import config from "./src/config/config.js";
async function bootstrap() {
    // Connect to MongoDB
    await Database.connect();
    const PORT = config.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 DualMind AI Arena Server is running on http://localhost:${PORT}`);
    });
}
bootstrap().catch((err) => {
    console.error("Fatal startup error:", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map