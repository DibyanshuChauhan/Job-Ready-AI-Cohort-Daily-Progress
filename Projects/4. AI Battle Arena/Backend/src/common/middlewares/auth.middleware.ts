import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../../auth/services/auth.service.js";
import { AppError } from "../errors/app-error.js";

// ── requireAuth middleware ────────────────────────────────────────────────────
// Reads the JWT from the httpOnly cookie, verifies it, and attaches the
// decoded payload to req.user.  Returns 401 if no token / invalid token.
//
// Note: We use `(req as any).jwtUser` to avoid conflicts with Passport's
// own `req.user` typing (which holds a Mongoose IUser document for Google OAuth).
// Arena controllers read from `req.jwtUser` instead.
// ─────────────────────────────────────────────────────────────────────────────
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  try {
    const token = (req.cookies as Record<string, string | undefined>)?.token;

    if (!token) {
      throw new AppError("Not authenticated — please log in", 401);
    }

    const decoded = AuthService.verifyToken(token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).jwtUser = decoded; // attach to request so controllers can read it
    next();
  } catch (err) {
    next(err);
  }
}
