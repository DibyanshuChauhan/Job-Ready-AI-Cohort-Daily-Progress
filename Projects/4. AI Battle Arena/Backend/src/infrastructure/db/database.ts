import dns from "dns";
import mongoose from "mongoose";
import config from "../../config/config.js";

// Ensure Node.js DNS resolver can resolve MongoDB Atlas SRV records on Windows/restricted ISP networks
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
  }
} catch (error) {
  console.warn("[MongoDB] Failed to set custom DNS servers, using system default:", error);
}

export class Database {
  private static isConnected = false;

  public static async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    if (!config.MONGO_URI) {
      console.warn("[MongoDB] MONGO_URI is not defined in environment config.");
      return;
    }

    try {
      mongoose.set("strictQuery", true);

      await mongoose.connect(config.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });

      this.isConnected = true;
      console.log("Connected to MongoDB successfully.");

      mongoose.connection.on("error", (err) => {
        console.error("[MongoDB] Connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("[MongoDB] Disconnected from MongoDB.");
        this.isConnected = false;
      });
    } catch (err) {
      console.error("[MongoDB] Initial connection failed:", err);
    }
  }

  public static getStatus(): boolean {
    return mongoose.connection.readyState === 1;
  }
}
