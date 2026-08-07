import { ArenaGraphEngine } from "../../infrastructure/ai/arena.graph.js";
import type { ArenaGraphResult, ChatHistoryItem } from "../types/arena.types.js";
import { AppError } from "../../common/errors/app-error.js";
import { ChatHistoryModel } from "../models/chat-history.model.js";

export class ArenaService {
  /**
   * Executes the dual model parallel battle and autonomous judge evaluation,
   * and saves the comparison result to MongoDB.
   */
  public static async executeBattle(prompt: string): Promise<ArenaGraphResult> {
    const trimmed = prompt.trim();
    if (!trimmed) {
      throw new AppError("Prompt cannot be empty", 400);
    }

    try {
      const result = await ArenaGraphEngine.execute(trimmed);

      // Persist to MongoDB (non-blocking if database is active)
      try {
        await ChatHistoryModel.create({
          prompt: trimmed,
          solution_1: result.solution_1,
          solution_2: result.solution_2,
          judge: result.judge,
        });
      } catch (dbErr) {
        console.warn("⚠️ [MongoDB] Failed to persist chat history:", dbErr);
      }

      return result;
    } catch (error) {
      console.error("[ArenaService Error]:", error);
      throw new AppError("Failed to execute model battle graph", 502);
    }
  }

  /**
   * Retrieves past comparisons sorted in reverse chronological order.
   */
  public static async getHistory(limit = 50): Promise<ChatHistoryItem[]> {
    try {
      const docs = await (ChatHistoryModel as any)
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean()
        .exec();

      return (docs || []) as ChatHistoryItem[];
    } catch (err) {
      console.error("[ArenaService.getHistory Error]:", err);
      return [];
    }
  }

  /**
   * Retrieves a single comparison by its ID.
   */
  public static async getHistoryById(id: string): Promise<ChatHistoryItem | null> {
    try {
      const doc = await (ChatHistoryModel as any).findById(id).lean().exec();
      if (!doc) {
        throw new AppError("Chat history item not found", 404);
      }
      return doc as ChatHistoryItem;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("Invalid history ID", 400);
    }
  }

  /**
   * Deletes a specific comparison by ID.
   */
  public static async deleteHistory(id: string): Promise<boolean> {
    try {
      const deleted = await (ChatHistoryModel as any).findByIdAndDelete(id).exec();
      return !!deleted;
    } catch (err) {
      console.error("[ArenaService.deleteHistory Error]:", err);
      throw new AppError("Failed to delete chat history item", 400);
    }
  }

  /**
   * Clears the entire chat history collection.
   */
  public static async clearAllHistory(): Promise<boolean> {
    try {
      await (ChatHistoryModel as any).deleteMany({}).exec();
      return true;
    } catch (err) {
      console.error("[ArenaService.clearAllHistory Error]:", err);
      throw new AppError("Failed to clear chat history", 500);
    }
  }
}
