import type { Response } from "express";

export interface ApiResponsePayload<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export class ApiResponse {
  static success<T>(res: Response, data: T, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      result: data,
    });
  }

  static error(res: Response, message = "Internal Server Error", statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      error: message,
    });
  }
}
