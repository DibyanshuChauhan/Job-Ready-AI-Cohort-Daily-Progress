import { AppError } from "../errors/app-error.js";
import { ApiResponse } from "../utils/api-response.js";
export function errorMiddleware(err, _req, res, _next) {
    console.error("[Unhandled Error]:", err);
    if (err instanceof AppError) {
        return ApiResponse.error(res, err.message, err.statusCode);
    }
    const message = process.env.NODE_ENV === "production" ? "Internal server error" : err.message;
    return ApiResponse.error(res, message, 500);
}
//# sourceMappingURL=error.middleware.js.map