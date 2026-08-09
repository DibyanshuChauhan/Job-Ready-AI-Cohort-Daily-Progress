import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { ApiResponse } from "../../common/utils/api-response.js";
import { AppError } from "../../common/errors/app-error.js";
import config from "../../config/config.js";
import type { IUser } from "../types/auth.types.js";

function setAuthCookie(res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, displayName } = req.body;
      const { token, payload } = await AuthService.register(email, password, displayName);

      setAuthCookie(res, token);
      ApiResponse.success(res, payload, "Account created successfully", 201);
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, payload } = await AuthService.login(email, password);

      setAuthCookie(res, token);
      ApiResponse.success(res, payload, "Logged in successfully", 200);
    } catch (err) {
      next(err);
    }
  }

  static googleCallback(req: Request, res: Response, next: NextFunction): void {
    try {
      if (!req.user) {
        throw new AppError("Google authentication failed", 401);
      }

      const user = req.user as IUser;
      const token = AuthService.generateToken(user);
      setAuthCookie(res, token);

      res.redirect(`${config.FRONTEND_URL}?auth=success`);
    } catch (err) {
      next(err);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.token as string | undefined;
      if (!token) {
        throw new AppError("Not authenticated", 401);
      }

      const decoded = AuthService.verifyToken(token);
      ApiResponse.success(
        res,
        { user: decoded },
        "User fetched successfully",
        200
      );
    } catch (err) {
      next(err);
    }
  }

  static logout(_req: Request, res: Response): void {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    ApiResponse.success(res, null, "Logged out successfully", 200);
  }
}
