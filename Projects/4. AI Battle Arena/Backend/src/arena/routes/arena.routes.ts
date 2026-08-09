import { Router } from "express";
import { ArenaController } from "../controllers/arena.controller.js";
import { requireAuth } from "../../common/middlewares/auth.middleware.js";

const router = Router();

// ── All arena routes require a valid JWT cookie ───────────────────────────────
// requireAuth reads req.cookies.token, verifies it, and populates req.user.
// Unauthenticated requests will receive 401 before reaching the controller.

// Primary comparison execution route
router.post("/invoke", requireAuth, ArenaController.invoke);

// Chat history routes
router.get("/history", requireAuth, ArenaController.getHistory);
router.delete("/history", requireAuth, ArenaController.clearAllHistory);
router.get("/history/:id", requireAuth, ArenaController.getHistoryById);
router.delete("/history/:id", requireAuth, ArenaController.deleteHistory);

// Arena service health check (public — no auth needed)
router.get("/health", ArenaController.healthCheck);

export const arenaRouter = router;
