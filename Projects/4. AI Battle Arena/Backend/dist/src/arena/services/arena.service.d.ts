import type { ArenaGraphResult, ChatHistoryItem } from "../types/arena.types.js";
export declare class ArenaService {
    /**
     * Executes the dual model parallel battle and autonomous judge evaluation,
     * and saves the comparison result to MongoDB.
     */
    static executeBattle(prompt: string): Promise<ArenaGraphResult>;
    /**
     * Retrieves past comparisons sorted in reverse chronological order.
     */
    static getHistory(limit?: number): Promise<ChatHistoryItem[]>;
    /**
     * Retrieves a single comparison by its ID.
     */
    static getHistoryById(id: string): Promise<ChatHistoryItem | null>;
    /**
     * Deletes a specific comparison by ID.
     */
    static deleteHistory(id: string): Promise<boolean>;
    /**
     * Clears the entire chat history collection.
     */
    static clearAllHistory(): Promise<boolean>;
}
//# sourceMappingURL=arena.service.d.ts.map