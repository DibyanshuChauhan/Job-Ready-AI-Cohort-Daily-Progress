export { authRouter } from "./routes/auth.routes.js";
export { AuthController } from "./controllers/auth.controller.js";
export { AuthService } from "./services/auth.service.js";
export { UserModel } from "./models/user.model.js";
export {
  RegisterSchema,
  LoginSchema,
  validateRegister,
  validateLogin,
  validateBody,
} from "./validators/auth.validator.js";
export type {
  RegisterInput,
  LoginInput,
} from "./validators/auth.validator.js";
export type {
  IUser,
  IUserData,
  JwtPayload,
  AuthResponsePayload,
} from "./types/auth.types.js";
