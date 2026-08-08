import { ArenaGraphEngine } from "../../infrastructure/ai/arena.graph.js";
import type { ArenaGraphResult, ChatHistoryItem, ChatTurnItem } from "../types/arena.types.js";
import { AppError } from "../../common/errors/app-error.js";
import { ChatHistoryModel, type IChatTurn } from "../models/chat-history.model.js";
import { LLMProvider } from "../../infrastructure/ai/llm.provider.js";

export class ArenaService {
  // Use Gemini to generate a short, clean 3-5 word title for a new chat session
  public static async generateChatTitle(promptText: string): Promise<string> {
    try {
      const gemini = LLMProvider.getGemini();
      const response = await gemini.invoke(
        `Generate a concise, friendly chat title (3 to 6 words max, no quotes, no prefix like 'Title:') for this prompt:\n"${promptText}"`
      );
      const title = response.text ? response.text.trim().replace(/^["']|["']$/g, "") : "";
      return title || (promptText.length > 40 ? promptText.slice(0, 40) + "..." : promptText);
    } catch (err) {
      console.warn("⚠️ [Gemini] Failed to generate chat title, falling back to prompt text:", err);
      return promptText.length > 40 ? promptText.slice(0, 40) + "..." : promptText;
    }
  }

  // Main method to run the battle graph and persist/update the chat session in MongoDB
  public static async executeBattle(
    prompt: string,
    sessionId?: string | null
  ): Promise<ArenaGraphResult & { sessionId: string; entries: ChatTurnItem[] }> {
    const trimmed = prompt.trim();
    if (!trimmed) {
      throw new AppError("Prompt cannot be empty", 400);
    }

    try {
      // Find existing chat session if sessionId was passed
      let historyDoc: any = null;
      if (sessionId) {
        try {
          historyDoc = await (ChatHistoryModel as any).findById(sessionId);
        } catch (err) {
          console.warn("⚠️ [ArenaService] Could not find session by ID:", sessionId);
        }
      }

      // Collect previous turns to format conversation memory for the models
      let previousEntries: IChatTurn[] = [];
      if (historyDoc) {
        if (historyDoc.entries && historyDoc.entries.length > 0) {
          previousEntries = historyDoc.entries;
        } else if (historyDoc.prompt) {
          // Handle legacy docs created before multi-turn support
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

      // Format past turns into prompt text so models remember previous context
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

      // Run parallel models + judge
      const result = await ArenaGraphEngine.execute(trimmed, historyContext);

      const newTurn: IChatTurn = {
        prompt: trimmed,
        solution_1: result.solution_1,
        solution_2: result.solution_2,
        judge: result.judge,
      };

      // Save new turn to MongoDB
      try {
        if (historyDoc) {
          // Append turn to existing session
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
          // Generate an AI title using Gemini for the new chat session
          const chatTitle = await ArenaService.generateChatTitle(trimmed);

          // Create a brand new session document
          historyDoc = await ChatHistoryModel.create({
            prompt: chatTitle,
            solution_1: result.solution_1,
            solution_2: result.solution_2,
            judge: result.judge,
            entries: [newTurn],
          });
        }
      } catch (dbErr) {
        console.warn("⚠️ [MongoDB] Failed to persist chat history:", dbErr);
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
      throw new AppError("Failed to execute model battle graph", 502);
    }
  }

  // Fetch recent chat sessions sorted by latest activity
  public static async getHistory(limit = 50): Promise<ChatHistoryItem[]> {
    try {
      const docs = await (ChatHistoryModel as any)
        .find({})
        .sort({ updatedAt: -1, createdAt: -1 })
        .limit(limit)
        .lean()
        .exec();

      return (docs || []).map((doc: any) => {
        // Ensure legacy docs without entries array get a default entries structure
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

  // Fetch single chat session by ID
  public static async getHistoryById(id: string): Promise<ChatHistoryItem | null> {
    try {
      const doc = await (ChatHistoryModel as any).findById(id).lean().exec();
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

  // Delete a session by ID
  public static async deleteHistory(id: string): Promise<boolean> {
    try {
      const deleted = await (ChatHistoryModel as any).findByIdAndDelete(id).exec();
      return !!deleted;
    } catch (err) {
      console.error("[ArenaService.deleteHistory Error]:", err);
      throw new AppError("Failed to delete chat history item", 400);
    }
  }

  // Clear all saved history
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
