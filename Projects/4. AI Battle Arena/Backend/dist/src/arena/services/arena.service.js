import { ArenaGraphEngine } from "../../infrastructure/ai/arena.graph.js";
import { AppError } from "../../common/errors/app-error.js";
import { ChatHistoryModel } from "../models/chat-history.model.js";
export class ArenaService {
    /**
     * Executes the dual model parallel battle and autonomous judge evaluation,
     * and saves the comparison result to MongoDB.
     */
    static async executeBattle(prompt) {
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
            }
            catch (dbErr) {
                console.warn("⚠️ [MongoDB] Failed to persist chat history:", dbErr);
            }
            return result;
        }
        catch (error) {
            console.error("[ArenaService Error]:", error);
            throw new AppError("Failed to execute model battle graph", 502);
        }
    }
    /**
     * Retrieves past comparisons sorted in reverse chronological order.
     */
    static async getHistory(limit = 50) {
        try {
            const docs = await ChatHistoryModel
                .find({})
                .sort({ createdAt: -1 })
                .limit(limit)
                .lean()
                .exec();
            return (docs || []);
        }
        catch (err) {
            console.error("[ArenaService.getHistory Error]:", err);
            return [];
        }
    }
    /**
     * Retrieves a single comparison by its ID.
     */
    static async getHistoryById(id) {
        try {
            const doc = await ChatHistoryModel.findById(id).lean().exec();
            if (!doc) {
                throw new AppError("Chat history item not found", 404);
            }
            return doc;
        }
        catch (err) {
            if (err instanceof AppError)
                throw err;
            throw new AppError("Invalid history ID", 400);
        }
    }
    /**
     * Deletes a specific comparison by ID.
     */
    static async deleteHistory(id) {
        try {
            const deleted = await ChatHistoryModel.findByIdAndDelete(id).exec();
            return !!deleted;
        }
        catch (err) {
            console.error("[ArenaService.deleteHistory Error]:", err);
            throw new AppError("Failed to delete chat history item", 400);
        }
    }
    /**
     * Clears the entire chat history collection.
     */
    static async clearAllHistory() {
        try {
            await ChatHistoryModel.deleteMany({}).exec();
            return true;
        }
        catch (err) {
            console.error("[ArenaService.clearAllHistory Error]:", err);
            throw new AppError("Failed to clear chat history", 500);
        }
    }
}
//# sourceMappingURL=arena.service.js.map