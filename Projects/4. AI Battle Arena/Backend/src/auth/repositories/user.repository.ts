import { UserModel } from "../models/user.model.js";
import type { IUser, IUserData } from "../types/auth.types.js";

export class UserRepository {
  public static async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  public static async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  public static async findByGoogleId(googleId: string): Promise<IUser | null> {
    return UserModel.findOne({ googleId }).exec();
  }

  public static async create(userData: Partial<IUserData>): Promise<IUser> {
    return UserModel.create(userData);
  }

  public static async save(user: IUser): Promise<IUser> {
    return user.save();
  }
}
