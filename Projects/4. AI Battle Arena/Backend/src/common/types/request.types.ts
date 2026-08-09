import type { Request } from "express";
import type { JwtPayload } from "../../auth/types/auth.types.js";

export interface AuthenticatedRequest extends Request {
  jwtUser?: JwtPayload;
}
