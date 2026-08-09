import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { AppError } from "../../common/errors/app-error.js";
import config from "../../config/config.js";
import type { IUser, JwtPayload, AuthResponsePayload } from "../types/auth.types.js";

const SALT_ROUNDS = 12;

export class AuthService {
  // ── Register a new local user ──────────────────────────────────────────
  static async register(
    email: string,
    password: string,
    displayName: string
  ): Promise<{ token: string; payload: AuthResponsePayload }> {
    // Check for duplicate email
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new AppError("An account with this email already exists", 409);
    }

    // Hash password with bcrypt (12 salt rounds)
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Persist to MongoDB
    const user = await UserModel.create({
      email,
      passwordHash,
      displayName,
      provider: "local",
    });

    const token = AuthService.generateToken(user);
    return { token, payload: AuthService.buildResponsePayload(user) };
  }

  // ── Login with email + password ────────────────────────────────────────
  static async login(
    email: string,
    password: string
  ): Promise<{ token: string; payload: AuthResponsePayload }> {
    const user = await UserModel.findOne({ email });

    // Generic message prevents email enumeration attacks
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

  // ── Find or create a Google OAuth user in MongoDB ─────────────────────
  // Called by the Passport Google strategy after successful OAuth.
  // All Google profile data (googleId, email, displayName, avatar) is
  // persisted in the MongoDB User collection.
  static async findOrCreateGoogleUser(profile: {
    googleId: string;
    email: string;
    displayName: string;
    avatar?: string;
  }): Promise<IUser> {
    // 1. Try to find by googleId (returning user logs in again)
    let user = await UserModel.findOne({ googleId: profile.googleId });

    if (user) {
      // Refresh display name / avatar in case they changed on Google
      user.displayName = profile.displayName;
      if (profile.avatar !== undefined) user.avatar = profile.avatar;
      await user.save();
      return user;
    }

    // 2. Local account with same email exists → link it to Google
    user = await UserModel.findOne({ email: profile.email });

    if (user) {
      user.googleId  = profile.googleId;
      user.provider  = "google";
      if (profile.avatar !== undefined) user.avatar = profile.avatar;
      await user.save();
      return user;
    }

    // 3. Brand-new Google user → create and persist to MongoDB
    user = await UserModel.create({
      email:        profile.email,
      displayName:  profile.displayName,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
      googleId:     profile.googleId,
      provider:     "google",
      passwordHash: null,   // Google users have no local password
    });

    return user;
  }

  // ── JWT generation ─────────────────────────────────────────────────────
  static generateToken(user: IUser): string {
    const payload: JwtPayload = {
      userId:      (user._id as { toString(): string }).toString(),
      email:       user.email,
      displayName: user.displayName,
      provider:    user.provider,
    };

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  // ── Verify JWT and return the decoded payload ──────────────────────────
  static verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }
  }

  // ── Build client-safe response object (no passwordHash) ───────────────
  static buildResponsePayload(user: IUser): AuthResponsePayload {
    const base = {
      id:          (user._id as { toString(): string }).toString(),
      email:       user.email,
      displayName: user.displayName,
      provider:    user.provider,
    };

    // Only include avatar if it exists — avoids exactOptionalPropertyTypes error
    if (user.avatar != null) {
      return { user: { ...base, avatar: user.avatar } };
    }
    return { user: base };
  }
}
