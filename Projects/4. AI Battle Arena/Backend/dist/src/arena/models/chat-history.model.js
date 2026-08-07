import mongoose, { Schema, Document } from "mongoose";
const JudgeSchema = new Schema({
    solution_1_score: { type: Number, required: true, default: 0 },
    solution_2_score: { type: Number, required: true, default: 0 },
    solution_1_reasoning: { type: String, required: true, default: "" },
    solution_2_reasoning: { type: String, required: true, default: "" },
}, { _id: false });
const ChatHistorySchema = new Schema({
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
}, {
    timestamps: true,
});
// Optimize query performance for reverse chronological sorting
ChatHistorySchema.index({ createdAt: -1 });
export const ChatHistoryModel = mongoose.models.ChatHistory ||
    mongoose.model("ChatHistory", ChatHistorySchema);
//# sourceMappingURL=chat-history.model.js.map