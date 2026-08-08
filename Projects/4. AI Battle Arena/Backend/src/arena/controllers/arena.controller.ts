import type { Request, Response, NextFunction } from "express";
import { ArenaService } from "../services/arena.service.js";
import { ArenaInvokeSchema } from "../schemas/arena.schema.js";
import { ApiResponse } from "../../common/utils/api-response.js";
import { AppError } from "../../common/errors/app-error.js";

export class ArenaController {
  // POST /api/v1/arena/invoke
  // Triggers battle between Mistral and Cohere, plus Gemini judging
  public static async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parseResult = ArenaInvokeSchema.safeParse(req.body);
      if (!parseResult.success) {
        const issues = parseResult.error.issues.map((i) => i.message).join(", ");
        throw new AppError(`Validation error: ${issues}`, 400);
      }

      const { input, sessionId } = parseResult.data;
      const result = await ArenaService.executeBattle(input, sessionId);

      ApiResponse.success(res, result, "Graph executed successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/v1/arena/history
  // Returns all past sessions for sidebar navigation
  public static async getHistory(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const history = await ArenaService.getHistory();
      ApiResponse.success(res, history, "Chat history retrieved successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/v1/arena/history/:id
  // Returns details for a specific past session
  public static async getHistoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;
      if (!id) {
        throw new AppError("History ID is required", 400);
      }
      const item = await ArenaService.getHistoryById(id);
      ApiResponse.success(res, item, "Chat history item retrieved successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/v1/arena/history/:id
  // Delete a single chat session
  public static async deleteHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;
      if (!id) {
        throw new AppError("History ID is required", 400);
      }
      await ArenaService.deleteHistory(id);
      ApiResponse.success(res, { deleted: true }, "History item deleted successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/v1/arena/history
  // Wipe all stored chat history
  public static async clearAllHistory(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await ArenaService.clearAllHistory();
      ApiResponse.success(res, { cleared: true }, "All history cleared successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/v1/arena/health
  // Basic health check to make sure backend is up
  public static async healthCheck(_req: Request, res: Response): Promise<void> {
    ApiResponse.success(
      res,
      { status: "healthy", timestamp: new Date().toISOString() },
      "Arena API is active",
      200
    );
  }
}
