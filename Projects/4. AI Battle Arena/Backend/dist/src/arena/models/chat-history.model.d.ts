import mongoose, { Document } from "mongoose";
import type { JudgeEvaluation } from "../types/arena.types.js";
export interface IChatHistoryDoc extends Document {
    prompt: string;
    solution_1: string;
    solution_2: string;
    judge: JudgeEvaluation;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ChatHistoryModel: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<IChatHistoryDoc, {}, {}, {}, Document<unknown, {}, IChatHistoryDoc, {}, mongoose.DefaultSchemaOptions> & IChatHistoryDoc & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IChatHistoryDoc>;
//# sourceMappingURL=chat-history.model.d.ts.map