import type { Document, Types } from "mongoose";

// ──────────────────────────────────────────────────────────────────────────
//  IUserData — the plain data shape of a user record.
//  Used in the service layer where Document methods aren't needed.
// ──────────────────────────────────────────────────────────────────────────
export interface IUserData {
  email: string;
  passwordHash: string | null;    // null for Google-only accounts
  displayName: string;
  avatar: string | null;          // null when no profile photo
  provider: "local" | "google";
  googleId: string | null;        // null for local accounts
  createdAt: Date;
  updatedAt: Date;
}

// ──────────────────────────────────────────────────────────────────────────
//  IUser — the full Mongoose document (IUserData + Document methods).
//  Used by the model definition and anywhere that needs .save() / ._id etc.
// ──────────────────────────────────────────────────────────────────────────
export interface IUser extends IUserData, Document {
  _id: Types.ObjectId;
}

// ── Payload embedded inside the JWT ────────────────────────────────────────
export interface JwtPayload {
  userId: string;
  email: string;
  displayName: string;
  provider: "local" | "google";
  iat?: number;
  exp?: number;
}

// ── Shape returned to the client after register / login ────────────────────
export interface AuthResponsePayload {
  user: {
    id: string;
    email: string;
    displayName: string;
    avatar?: string;
    provider: "local" | "google";
  };
}
