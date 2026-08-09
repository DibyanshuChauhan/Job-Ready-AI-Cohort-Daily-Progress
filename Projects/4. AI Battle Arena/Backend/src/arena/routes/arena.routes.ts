import { Router } from "express";
import { ArenaController } from "../controllers/arena.controller.js";
import { requireAuth } from "../../common/middlewares/auth.middleware.js";

const router = Router();

router.post("/invoke", requireAuth, ArenaController.invoke);

router.get("/history", requireAuth, ArenaController.getHistory);
router.delete("/history", requireAuth, ArenaController.clearAllHistory);
router.get("/history/:id", requireAuth, ArenaController.getHistoryById);
router.delete("/history/:id", requireAuth, ArenaController.deleteHistory);

router.get("/health", ArenaController.healthCheck);

export const arenaRouter = router;
