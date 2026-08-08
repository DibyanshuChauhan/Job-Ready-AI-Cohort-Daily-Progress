import mongoose, { Schema, Document } from "mongoose";
import type { JudgeEvaluation } from "../types/arena.types.js";

// Individual turn inside a multi-turn chat
export interface IChatTurn {
  _id?: mongoose.Types.ObjectId;
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
  createdAt?: Date;
}

// Full ChatHistory document in MongoDB
export interface IChatHistoryDoc extends Document {
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
  entries: IChatTurn[];
  createdAt: Date;
  updatedAt: Date;
}

// Sub-schema for storing judge scores & reasoning
const JudgeSchema = new Schema<JudgeEvaluation>(
  {
    solution_1_score: { type: Number, required: true, default: 0 },
    solution_2_score: { type: Number, required: true, default: 0 },
    solution_1_reasoning: { type: String, required: true, default: "" },
    solution_2_reasoning: { type: String, required: true, default: "" },
  },
  { _id: false }
);

// Sub-schema for each message exchange turn in a session
const ChatTurnSchema = new Schema<IChatTurn>(
  {
    prompt: { type: String, required: true },
    solution_1: { type: String, required: true, default: "" },
    solution_2: { type: String, required: true, default: "" },
    judge: { type: JudgeSchema, required: true },
  },
  { timestamps: true }
);

// Main chat session schema
const ChatHistorySchema = new Schema<IChatHistoryDoc>(
  {
    // First prompt used as the chat title
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
      trim: true,
      index: true,
    },
    // Top-level fields kept for backwards compatibility with legacy single-turn documents
    solution_1: {
      type: String,
      required: true,
      default: "",
    },
    solution_2: {
      type: String,
      required: true,
      default: "",
    },
    judge: {
      type: JudgeSchema,
      required: true,
    },
    // Array of all turns in this chat session
    entries: {
      type: [ChatTurnSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexing timestamps for fast sorting in history lists
ChatHistorySchema.index({ updatedAt: -1 });
ChatHistorySchema.index({ createdAt: -1 });

export const ChatHistoryModel =
  mongoose.models.ChatHistory ||
  mongoose.model<IChatHistoryDoc>("ChatHistory", ChatHistorySchema);
