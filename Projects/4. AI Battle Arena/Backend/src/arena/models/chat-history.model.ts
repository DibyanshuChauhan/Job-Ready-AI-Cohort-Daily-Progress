import mongoose, { Schema, Document } from "mongoose";
import type { JudgeEvaluation } from "../types/arena.types.js";

export interface IChatTurn {
  _id?: mongoose.Types.ObjectId;
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
  createdAt?: Date;
}

export interface IChatHistoryDoc extends Document {
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
  entries: IChatTurn[];
  createdAt: Date;
  updatedAt: Date;
}

const JudgeSchema = new Schema<JudgeEvaluation>(
  {
    solution_1_score: { type: Number, required: true, default: 0 },
    solution_2_score: { type: Number, required: true, default: 0 },
    solution_1_reasoning: { type: String, required: true, default: "" },
    solution_2_reasoning: { type: String, required: true, default: "" },
  },
  { _id: false }
);

const ChatTurnSchema = new Schema<IChatTurn>(
  {
    prompt: { type: String, required: true },
    solution_1: { type: String, required: true, default: "" },
    solution_2: { type: String, required: true, default: "" },
    judge: { type: JudgeSchema, required: true },
  },
  { timestamps: true }
);

const ChatHistorySchema = new Schema<IChatHistoryDoc>(
  {
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
      trim: true,
      index: true,
    },
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
    entries: {
      type: [ChatTurnSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Optimize query performance for reverse chronological sorting
ChatHistorySchema.index({ updatedAt: -1 });
ChatHistorySchema.index({ createdAt: -1 });

export const ChatHistoryModel =
  mongoose.models.ChatHistory ||
  mongoose.model<IChatHistoryDoc>("ChatHistory", ChatHistorySchema);

