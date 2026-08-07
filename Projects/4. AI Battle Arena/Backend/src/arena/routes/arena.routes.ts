import { Router } from "express";
import { ArenaController } from "../controllers/arena.controller.js";

const router = Router();

// Primary comparison execution route
router.post("/invoke", ArenaController.invoke);

// Arena service health check
router.get("/health", ArenaController.healthCheck);

export const arenaRouter = router;
