import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error.js";
export declare function errorMiddleware(err: Error | AppError, _req: Request, res: Response, _next: NextFunction): Response<any, Record<string, any>>;
//# sourceMappingURL=error.middleware.d.ts.map