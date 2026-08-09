import type { Document, Types } from "mongoose";

export interface IUserData {
  email: string;
  passwordHash: string | null;
  displayName: string;
  avatar: string | null;
  provider: "local" | "google";
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IUserData, Document {
  _id: Types.ObjectId;
}

export interface JwtPayload {
  userId: string;
  email: string;
  displayName: string;
  provider: "local" | "google";
  iat?: number;
  exp?: number;
}

export interface AuthResponsePayload {
  user: {
    id: string;
    email: string;
    displayName: string;
    avatar?: string;
    provider: "local" | "google";
  };
}
