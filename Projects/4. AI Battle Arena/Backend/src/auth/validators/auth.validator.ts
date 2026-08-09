import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../common/errors/app-error.js";

// ── Register validator chain ──
export const registerValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(),

  body("displayName")
    .trim()
    .notEmpty().withMessage("Display name is required")
    .isLength({ min: 2, max: 40 })
    .withMessage("Display name must be between 2 and 40 characters"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),
];

// ── Login validator chain ──
export const loginValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

// ── Middleware: collect errors from express-validator and throw AppError ──
export function handleValidationErrors(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg).join(", ");
    return next(new AppError(`Validation failed: ${messages}`, 400));
  }
  next();
}
