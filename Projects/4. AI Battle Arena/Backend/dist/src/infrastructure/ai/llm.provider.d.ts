import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
export declare class LLMProvider {
    private static _geminiInstance;
    private static _mistralInstance;
    private static _cohereInstance;
    static getGemini(): ChatGoogle;
    static getMistral(): ChatMistralAI;
    static getCohere(): ChatCohere;
}
//# sourceMappingURL=llm.provider.d.ts.map