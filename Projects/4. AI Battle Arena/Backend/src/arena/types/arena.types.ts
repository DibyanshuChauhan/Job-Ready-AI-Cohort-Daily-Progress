export interface JudgeEvaluation {
  solution_1_score: number;
  solution_2_score: number;
  solution_1_reasoning: string;
  solution_2_reasoning: string;
}

export interface ArenaGraphResult {
  problem?: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
}

export interface ArenaInvokeInput {
  input: string;
  sessionId?: string | null;
}

export interface ChatTurnItem {
  _id?: string;
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
  createdAt?: string | Date;
}

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
