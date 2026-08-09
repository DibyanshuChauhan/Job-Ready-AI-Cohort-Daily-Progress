import type { Request, Response, NextFunction } from "express";
import { ArenaService } from "../services/arena.service.js";
import { ArenaInvokeSchema } from "../schemas/arena.schema.js";
import { ApiResponse } from "../../common/utils/api-response.js";
import { AppError } from "../../common/errors/app-error.js";
import type { AuthenticatedRequest } from "../../common/types/request.types.js";

function getUserId(req: AuthenticatedRequest): string {
  const user = req.jwtUser;
  if (!user?.userId) {
    throw new AppError("Not authenticated", 401);
  }
  return user.userId;
}

export class ArenaController {
  public static async invoke(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
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

  public static async getHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = getUserId(req);
      const history = await ArenaService.getHistory(userId);
      ApiResponse.success(res, history, "Chat history retrieved successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  public static async getHistoryById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
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

  public static async deleteHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
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

  public static async clearAllHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = getUserId(req);
      await ArenaService.clearAllHistory(userId);
      ApiResponse.success(res, { cleared: true }, "All history cleared successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  public static async healthCheck(_req: Request, res: Response): Promise<void> {
    ApiResponse.success(
      res,
      { status: "healthy", timestamp: new Date().toISOString() },
      "Arena API is active",
      200
    );
  }
}
