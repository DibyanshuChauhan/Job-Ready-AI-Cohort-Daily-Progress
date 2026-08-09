import mongoose, { Schema, type Model } from "mongoose";
import type { IUserData } from "../types/auth.types.js";

// ─────────────────────────────────────────
//  User Schema
//  Supports both local (email + password) and
//  Google OAuth accounts in the same collection.
// ─────────────────────────────────────────
const UserSchema = new Schema<IUserData>(
  {
    // ── Identity ──
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    displayName: {
      type: String,
      required: [true, "Display name is required"],
      trim: true,
    },

    // ── Auth provider ──
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // ── Local auth: bcrypt-hashed password (null for Google-only users) ──
    passwordHash: {
      type: String,
      default: null,
    },

    // ── Google OAuth: populated when provider === 'google' ──
    googleId: {
      type: String,
      default: null,
      sparse: true,   // sparse index — allows multiple null values
      index: true,
    },

    // ── Profile ──
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Strip passwordHash before sending any JSON response
UserSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: unknown, ret: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete ret.passwordHash;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ret;
  },
});

// Re-use the existing model if HMR / ts-node has already registered it,
// but cast explicitly so TypeScript knows TRawDocType = IUserData.
// Without the cast, mongoose.models["User"] returns Model<unknown>, which
// causes findOne({ email }) to resolve the wrong overload.
export const UserModel: Model<IUserData> =
  (mongoose.models["User"] as Model<IUserData> | undefined) ??
  mongoose.model<IUserData>("User", UserSchema);
