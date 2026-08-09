import mongoose from "mongoose";
import { ChatHistoryModel, type IChatHistoryDoc } from "../models/chat-history.model.js";
import type { JudgeEvaluation } from "../types/arena.types.js";
import type { IChatTurn } from "../models/chat-history.model.js";

export interface ICreateChatInput {
  userId: mongoose.Types.ObjectId;
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeEvaluation;
  entries: IChatTurn[];
}

export class ArenaRepository {
  public static async findByIdAndUser(id: string, userId: string): Promise<IChatHistoryDoc | null> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    return ChatHistoryModel.findOne({
      _id: id,
      userId: userObjectId,
    }).exec();
  }

  public static async findByUser(userId: string, limit = 50): Promise<IChatHistoryDoc[]> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    return ChatHistoryModel.find({ userId: userObjectId })
      .sort({ updatedAt: -1, createdAt: -1 })
      .limit(limit)
      .exec();
  }

  public static async create(chatData: ICreateChatInput): Promise<IChatHistoryDoc> {
    return ChatHistoryModel.create(chatData);
  }

  public static async save(doc: IChatHistoryDoc): Promise<IChatHistoryDoc> {
    return doc.save();
  }

  public static async deleteByIdAndUser(id: string, userId: string): Promise<IChatHistoryDoc | null> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    return ChatHistoryModel.findOneAndDelete({
      _id: id,
      userId: userObjectId,
    }).exec();
  }

  public static async deleteAllByUser(userId: string): Promise<void> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    await ChatHistoryModel.deleteMany({ userId: userObjectId }).exec();
  }
}
