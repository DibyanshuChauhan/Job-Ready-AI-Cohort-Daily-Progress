import mongoose from "mongoose";
import config from "../../config/config.js";

export class Database {
  private static isConnected = false;

  public static async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    if (!config.MONGO_URI) {
      console.warn("⚠️ [MongoDB]: MONGO_URI is not defined in environment config.");
      return;
    }

    try {
      mongoose.set("strictQuery", true);

      await mongoose.connect(config.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });

      this.isConnected = true;
      console.log(" Connected to MongoDB successfully.");

      mongoose.connection.on("error", (err) => {
        console.error("❌ [MongoDB] Connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ [MongoDB] Disconnected from MongoDB.");
        this.isConnected = false;
      });
    } catch (err) {
      console.error("❌ [MongoDB] Initial connection failed:", err);
      // Allow the app to proceed even if MongoDB is starting or offline
    }
  }

  public static getStatus(): boolean {
    return mongoose.connection.readyState === 1;
  }
}
