import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../common/errors/app-error.js";

export const RegisterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Must be a valid email address")
    .toLowerCase(),

  displayName: z
    .string()
    .trim()
    .min(1, "Display name is required")
    .min(2, "Display name must be between 2 and 40 characters")
    .max(40, "Display name must be between 2 and 40 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Must be a valid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;

export function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message).join(", ");
      return next(new AppError(`Validation failed: ${messages}`, 400));
    }
    req.body = result.data;
    next();
  };
}

export const validateRegister = validateBody(RegisterSchema);
export const validateLogin = validateBody(LoginSchema);
