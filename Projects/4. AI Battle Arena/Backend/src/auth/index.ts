export { authRouter } from "./routes/auth.routes.js";
export { AuthController } from "./controllers/auth.controller.js";
export { AuthService } from "./services/auth.service.js";
export { UserModel } from "./models/user.model.js";
export {
  registerValidator,
  loginValidator,
  handleValidationErrors,
} from "./validators/auth.validator.js";
export type {
  IUser,
  IUserData,
  JwtPayload,
  AuthResponsePayload,
} from "./types/auth.types.js";
