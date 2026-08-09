import type { Request, Response, NextFunction } from "express";
import { ArenaService } from "../services/arena.service.js";
import { ArenaInvokeSchema } from "../schemas/arena.schema.js";
import { ApiResponse } from "../../common/utils/api-response.js";
import { AppError } from "../../common/errors/app-error.js";
import type { JwtPayload } from "../../auth/types/auth.types.js";

// Helper: extract the authenticated userId from req.jwtUser (set by requireAuth middleware).
// We store on jwtUser (not req.user) to avoid collision with Passport's Mongoose IUser doc.
function getUserId(req: Request): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).jwtUser as JwtPayload | undefined;
  if (!user?.userId) {
    throw new AppError("Not authenticated", 401);
  }
  return user.userId;
}

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
      const userId = getUserId(req);
      const result = await ArenaService.executeBattle(input, sessionId, userId);

      ApiResponse.success(res, result, "Graph executed successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/v1/arena/history
  // Returns all past sessions for the authenticated user (sidebar navigation)
  public static async getHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = getUserId(req);
      const history = await ArenaService.getHistory(userId);
      ApiResponse.success(res, history, "Chat history retrieved successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/v1/arena/history/:id
  // Returns details for a specific past session (must belong to the authenticated user)
  public static async getHistoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;
      if (!id) {
        throw new AppError("History ID is required", 400);
      }
      const userId = getUserId(req);
      const item = await ArenaService.getHistoryById(id, userId);
      ApiResponse.success(res, item, "Chat history item retrieved successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/v1/arena/history/:id
  // Delete a single chat session (must belong to the authenticated user)
  public static async deleteHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const rawId = req.params.id;
      const id = Array.isArray(rawId) ? rawId[0] : rawId;
      if (!id) {
        throw new AppError("History ID is required", 400);
      }
      const userId = getUserId(req);
      await ArenaService.deleteHistory(id, userId);
      ApiResponse.success(res, { deleted: true }, "History item deleted successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/v1/arena/history
  // Wipe only the authenticated user's stored chat history
  public static async clearAllHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = getUserId(req);
      await ArenaService.clearAllHistory(userId);
      ApiResponse.success(res, { cleared: true }, "All history cleared successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/v1/arena/health
  // Basic health check to make sure backend is up (no auth required)
  public static async healthCheck(_req: Request, res: Response): Promise<void> {
    ApiResponse.success(
      res,
      { status: "healthy", timestamp: new Date().toISOString() },
      "Arena API is active",
      200
    );
  }
}
