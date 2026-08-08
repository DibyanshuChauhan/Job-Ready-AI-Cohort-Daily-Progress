// Scores and reasoning given by the Gemini judge for both models
export interface JudgeEvaluation {
  solution_1_score: number;
  solution_2_score: number;
  solution_1_reasoning: string;
  solution_2_reasoning: string;
}

// Output from the dual-model execution graph
export interface ArenaGraphResult {
  problem?: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
}

// Service input payload
export interface ArenaInvokeInput {
  input: string;
  sessionId?: string | null;
}

// Represents a single turn (question + model answers + judge score)
export interface ChatTurnItem {
  _id?: string;
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
  createdAt?: string | Date;
}

// Full session history item returned from API
export interface ChatHistoryItem {
  _id: string;
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
  entries?: ChatTurnItem[];
  createdAt: string | Date;
  updatedAt?: string | Date;
}
