import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../../config/config.js";
export class LLMProvider {
    static _geminiInstance = null;
    static _mistralInstance = null;
    static _cohereInstance = null;
    static getGemini() {
        if (!this._geminiInstance) {
            this._geminiInstance = new ChatGoogle({
                model: "gemini-flash-latest",
                apiKey: config.GOOGLE_API_KEY,
            });
        }
        return this._geminiInstance;
    }
    static getMistral() {
        if (!this._mistralInstance) {
            this._mistralInstance = new ChatMistralAI({
                model: "mistral-medium-latest",
                apiKey: config.MISTRALAI_API_KEY,
            });
        }
        return this._mistralInstance;
    }
    static getCohere() {
        if (!this._cohereInstance) {
            this._cohereInstance = new ChatCohere({
                model: "command-a-03-2025",
                apiKey: config.COHERE_API_KEY,
            });
        }
        return this._cohereInstance;
    }
}
//# sourceMappingURL=llm.provider.js.map