import mongoose, { Schema, type Model } from "mongoose";
import type { IUserData } from "../types/auth.types.js";

const UserSchema = new Schema<IUserData>(
  {
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
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    passwordHash: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
      sparse: true,
      index: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Never expose hashed passwords in JSON output
UserSchema.set("toJSON", {
  transform(_doc: unknown, ret: any): any {
    delete ret.passwordHash;
    return ret;
  },
});

export const UserModel: Model<IUserData> =
  (mongoose.models["User"] as Model<IUserData> | undefined) ??
  mongoose.model<IUserData>("User", UserSchema);
