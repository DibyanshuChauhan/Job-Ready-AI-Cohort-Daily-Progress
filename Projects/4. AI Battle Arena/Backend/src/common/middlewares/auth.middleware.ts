import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../../auth/services/auth.service.js";
import { AppError } from "../errors/app-error.js";

// Middleware to verify session token and set user on request
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  try {
    const token = (req.cookies as Record<string, string | undefined>)?.token;

    if (!token) {
      throw new AppError("Not authenticated — please log in", 401);
    }

    const decoded = AuthService.verifyToken(token);
    (req as any).jwtUser = decoded;
    next();
  } catch (err) {
    next(err);
  }
}
