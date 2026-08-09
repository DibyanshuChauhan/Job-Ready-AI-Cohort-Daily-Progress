import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { AppError } from "../../common/errors/app-error.js";
import config from "../../config/config.js";
import type { IUser, JwtPayload, AuthResponsePayload } from "../types/auth.types.js";

const SALT_ROUNDS = 12;

export class AuthService {
  static async register(
    email: string,
    password: string,
    displayName: string
  ): Promise<{ token: string; payload: AuthResponsePayload }> {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new AppError("An account with this email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await UserModel.create({
      email,
      passwordHash,
      displayName,
      provider: "local",
    });

    const token = AuthService.generateToken(user);
    return { token, payload: AuthService.buildResponsePayload(user) };
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ token: string; payload: AuthResponsePayload }> {
    const user = await UserModel.findOne({ email });

    if (!user || !user.passwordHash) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = AuthService.generateToken(user);
    return { token, payload: AuthService.buildResponsePayload(user) };
  }

  // Look up user by Google ID or existing email, otherwise create new record
  static async findOrCreateGoogleUser(profile: {
    googleId: string;
    email: string;
    displayName: string;
    avatar?: string;
  }): Promise<IUser> {
    let user = await UserModel.findOne({ googleId: profile.googleId });

    if (user) {
      user.displayName = profile.displayName;
      if (profile.avatar !== undefined) user.avatar = profile.avatar;
      await user.save();
      return user;
    }

    user = await UserModel.findOne({ email: profile.email });

    if (user) {
      user.googleId = profile.googleId;
      user.provider = "google";
      if (profile.avatar !== undefined) user.avatar = profile.avatar;
      await user.save();
      return user;
    }

    user = await UserModel.create({
      email: profile.email,
      displayName: profile.displayName,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
      googleId: profile.googleId,
      provider: "google",
      passwordHash: null,
    });

    return user;
  }

  static generateToken(user: IUser): string {
    const payload: JwtPayload = {
      userId: (user._id as { toString(): string }).toString(),
      email: user.email,
      displayName: user.displayName,
      provider: user.provider,
    };

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  static verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }
  }

  static buildResponsePayload(user: IUser): AuthResponsePayload {
    const base = {
      id: (user._id as { toString(): string }).toString(),
      email: user.email,
      displayName: user.displayName,
      provider: user.provider,
    };

    if (user.avatar != null) {
      return { user: { ...base, avatar: user.avatar } };
    }
    return { user: base };
  }
}
