import { ArenaGraphEngine } from "../../infrastructure/ai/arena.graph.js";
import type { ArenaGraphResult } from "../types/arena.types.js";
import { AppError } from "../../common/errors/app-error.js";

export class ArenaService {
  /**
   * Executes the dual model parallel battle and autonomous judge evaluation.
   * @param prompt User's question or problem statement
   * @returns ArenaGraphResult containing both solutions and judge scoring
   */
  public static async executeBattle(prompt: string): Promise<ArenaGraphResult> {
    const trimmed = prompt.trim();
    if (!trimmed) {
      throw new AppError("Prompt cannot be empty", 400);
    }

    try {
      const result = await ArenaGraphEngine.execute(trimmed);
      return result;
    } catch (error) {
      console.error("[ArenaService Error]:", error);
      throw new AppError("Failed to execute model battle graph", 502);
    }
  }
}
