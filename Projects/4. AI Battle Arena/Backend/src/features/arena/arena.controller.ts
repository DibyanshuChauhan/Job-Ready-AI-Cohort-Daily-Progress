import type { Request, Response, NextFunction } from "express";
import { ArenaService } from "./arena.service.js";
import { ArenaInvokeSchema } from "./arena.schema.js";
import { ApiResponse } from "../../common/utils/api-response.js";
import { AppError } from "../../common/errors/app-error.js";

export class ArenaController {
  public static async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parseResult = ArenaInvokeSchema.safeParse(req.body);
      if (!parseResult.success) {
        const issues = parseResult.error.issues.map((i) => i.message).join(", ");
        throw new AppError(`Validation error: ${issues}`, 400);
      }

      const { input } = parseResult.data;
      const result = await ArenaService.executeBattle(input);

      ApiResponse.success(res, result, "Graph executed successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  public static async healthCheck(_req: Request, res: Response): Promise<void> {
    ApiResponse.success(res, { status: "healthy", timestamp: new Date().toISOString() }, "Arena API is active", 200);
  }
}
