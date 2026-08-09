import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../../config/config.js";

export class LLMProvider {
  private static _geminiInstance: ChatGoogle | null = null;
  private static _mistralInstance: ChatMistralAI | null = null;
  private static _cohereInstance: ChatCohere | null = null;

  public static getGemini(): ChatGoogle {
    if (!this._geminiInstance) {
      this._geminiInstance = new ChatGoogle({
        model: "gemini-flash-latest",
        apiKey: config.GOOGLE_API_KEY,
      });
    }
    return this._geminiInstance;
  }

  public static getMistral(): ChatMistralAI {
    if (!this._mistralInstance) {
      this._mistralInstance = new ChatMistralAI({
        model: "mistral-medium-latest",
        apiKey: config.MISTRALAI_API_KEY,
      });
    }
    return this._mistralInstance;
  }

  public static getCohere(): ChatCohere {
    if (!this._cohereInstance) {
      this._cohereInstance = new ChatCohere({
        model: "command-a-03-2025",
        apiKey: config.COHERE_API_KEY,
      });
    }
    return this._cohereInstance;
  }
}
