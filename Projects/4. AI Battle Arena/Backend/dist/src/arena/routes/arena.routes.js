import { Router } from "express";
import { ArenaController } from "../controllers/arena.controller.js";
const router = Router();
// Primary comparison execution route
router.post("/invoke", ArenaController.invoke);
// Chat history routes
router.get("/history", ArenaController.getHistory);
router.delete("/history", ArenaController.clearAllHistory);
router.get("/history/:id", ArenaController.getHistoryById);
router.delete("/history/:id", ArenaController.deleteHistory);
// Arena service health check
router.get("/health", ArenaController.healthCheck);
export const arenaRouter = router;
//# sourceMappingURL=arena.routes.js.map