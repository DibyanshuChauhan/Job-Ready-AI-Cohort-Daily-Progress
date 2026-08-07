import { Router } from "express";
import { ArenaController } from "./arena.controller.js";

const router = Router();

// Primary invoke endpoint for battle comparison
router.post("/invoke", ArenaController.invoke);

// Feature health check
router.get("/health", ArenaController.healthCheck);

export const arenaRouter = router;
