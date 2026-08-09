import { ArenaGraphEngine } from "../../infrastructure/ai/arena.graph.js";
import type { ArenaGraphResult, ChatHistoryItem, ChatTurnItem } from "../types/arena.types.js";
import { AppError } from "../../common/errors/app-error.js";
import { ChatHistoryModel, type IChatTurn } from "../models/chat-history.model.js";
import { LLMProvider } from "../../infrastructure/ai/llm.provider.js";
import mongoose from "mongoose";

export class ArenaService {
  // Generate short title for chat session
  public static async generateChatTitle(promptText: string): Promise<string> {
    try {
      const gemini = LLMProvider.getGemini();
      const response = await gemini.invoke(
        `Generate a concise, friendly chat title (3 to 6 words max, no quotes, no prefix like 'Title:') for this prompt:\n"${promptText}"`
      );
      const title = response.text ? response.text.trim().replace(/^[\"']|[\"']$/g, "") : "";
      return title || (promptText.length > 40 ? promptText.slice(0, 40) + "..." : promptText);
    } catch (err) {
      return promptText.length > 40 ? promptText.slice(0, 40) + "..." : promptText;
    }
  }

  public static async executeBattle(
    prompt: string,
    sessionId?: string | null,
    userId?: string
  ): Promise<ArenaGraphResult & { sessionId: string; entries: ChatTurnItem[] }> {
    const trimmed = prompt.trim();
    if (!trimmed) {
      throw new AppError("Prompt cannot be empty", 400);
    }

    if (!userId) {
      throw new AppError("Not authenticated", 401);
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    try {
      let historyDoc: any = null;
      if (sessionId) {
        try {
          historyDoc = await (ChatHistoryModel as any).findOne({
            _id: sessionId,
            userId: userObjectId,
          });
        } catch (err) {
          // invalid or missing session ID
        }
      }

      let previousEntries: IChatTurn[] = [];
      if (historyDoc) {
        if (historyDoc.entries && historyDoc.entries.length > 0) {
          previousEntries = historyDoc.entries;
        } else if (historyDoc.prompt) {
          previousEntries = [
            {
              prompt: historyDoc.prompt,
              solution_1: historyDoc.solution_1,
              solution_2: historyDoc.solution_2,
              judge: historyDoc.judge,
            },
          ];
        }
      }

      let historyContext = "";
      if (previousEntries.length > 0) {
        historyContext =
          "Conversation History:\n" +
          previousEntries
            .map(
              (turn, idx) =>
                `[Turn ${idx + 1}]\nUser: ${turn.prompt}\nMistral: ${turn.solution_1}\nCohere: ${turn.solution_2}`
            )
            .join("\n\n");
      }

      const result = await ArenaGraphEngine.execute(trimmed, historyContext);

      const newTurn: IChatTurn = {
        prompt: trimmed,
        solution_1: result.solution_1,
        solution_2: result.solution_2,
        judge: result.judge,
      };

      try {
        if (historyDoc) {
          if (!historyDoc.entries || historyDoc.entries.length === 0) {
            historyDoc.entries = previousEntries;
          }
          historyDoc.entries.push(newTurn);
          historyDoc.solution_1 = result.solution_1;
          historyDoc.solution_2 = result.solution_2;
          historyDoc.judge = result.judge;
          historyDoc.markModified("entries");
          await historyDoc.save();
        } else {
          const chatTitle = await ArenaService.generateChatTitle(trimmed);

          historyDoc = await ChatHistoryModel.create({
            userId: userObjectId,
            prompt: chatTitle,
            solution_1: result.solution_1,
            solution_2: result.solution_2,
            judge: result.judge,
            entries: [newTurn],
          });
        }
      } catch (dbErr) {
        console.warn("[MongoDB] Failed to persist chat history:", dbErr);
      }

      const activeId = historyDoc ? historyDoc._id.toString() : (sessionId || "");
      const allEntries = historyDoc && historyDoc.entries ? historyDoc.entries : [newTurn];

      return {
        ...result,
        sessionId: activeId,
        entries: allEntries,
      };
    } catch (error) {
      console.error("[ArenaService Error]:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to execute model battle graph", 502);
    }
  }

  public static async getHistory(userId: string, limit = 50): Promise<ChatHistoryItem[]> {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const docs = await (ChatHistoryModel as any)
        .find({ userId: userObjectId })
        .sort({ updatedAt: -1, createdAt: -1 })
        .limit(limit)
        .lean()
        .exec();

      return (docs || []).map((doc: any) => {
        const entries =
          doc.entries && doc.entries.length > 0
            ? doc.entries
            : [
                {
                  _id: doc._id,
                  prompt: doc.prompt,
                  solution_1: doc.solution_1,
                  solution_2: doc.solution_2,
                  judge: doc.judge,
                  createdAt: doc.createdAt,
                },
              ];

        return {
          ...doc,
          _id: doc._id.toString(),
          entries,
        };
      });
    } catch (err) {
      console.error("[ArenaService.getHistory Error]:", err);
      return [];
    }
  }

  public static async getHistoryById(id: string, userId: string): Promise<ChatHistoryItem | null> {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const doc = await (ChatHistoryModel as any)
        .findOne({ _id: id, userId: userObjectId })
        .lean()
        .exec();
      if (!doc) {
        throw new AppError("Chat history item not found", 404);
      }
      const entries =
        doc.entries && doc.entries.length > 0
          ? doc.entries
          : [
              {
                _id: doc._id,
                prompt: doc.prompt,
                solution_1: doc.solution_1,
                solution_2: doc.solution_2,
                judge: doc.judge,
                createdAt: doc.createdAt,
              },
            ];
      return {
        ...doc,
        _id: doc._id.toString(),
        entries,
      } as ChatHistoryItem;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("Invalid history ID", 400);
    }
  }

  public static async deleteHistory(id: string, userId: string): Promise<boolean> {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const deleted = await (ChatHistoryModel as any)
        .findOneAndDelete({ _id: id, userId: userObjectId })
        .exec();
      if (!deleted) {
        throw new AppError("History item not found or access denied", 404);
      }
      return true;
    } catch (err) {
      if (err instanceof AppError) throw err;
      console.error("[ArenaService.deleteHistory Error]:", err);
      throw new AppError("Failed to delete chat history item", 400);
    }
  }

  public static async clearAllHistory(userId: string): Promise<boolean> {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      await (ChatHistoryModel as any).deleteMany({ userId: userObjectId }).exec();
      return true;
    } catch (err) {
      console.error("[ArenaService.clearAllHistory Error]:", err);
      throw new AppError("Failed to clear chat history", 500);
    }
  }
}
