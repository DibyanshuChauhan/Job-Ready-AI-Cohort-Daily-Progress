import { HumanMessage } from "@langchain/core/messages";
import {
    StateSchema,
    MessagesValue,
    ReducedValue,
    StateGraph,
    START,
    END,
} from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { z } from "zod";
import {
    CohereModel,
    MistralModel,
    GeminiModel,
} from "./ai.models.service.js";
import { createAgent, providerStrategy } from "langchain";

const State = new StateSchema({
    messages: MessagesValue,

    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (_, next) => next,
    }),

    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (_, next) => next,
    }),

    judge_recommendation: new ReducedValue(
        z.object({
            solution_1_score: z.number(),
            solution_2_score: z.number(),
        }).default({
            solution_1_score: 0,
            solution_2_score: 0,
        }),
        {
            reducer: (_, next) => next,
        }
    ),
});

/**
 * Generates solutions from Mistral and Cohere.
 */
const solutionNode: GraphNode<typeof State> = async (state) => {
    console.log("\n Solution Node:-");

    try {
        console.dir(state, { depth: null });

        const userPrompt = state.messages?.[0]?.text;

        if (!userPrompt) {
            throw new Error("User prompt not found.");
        }

        console.log("Generating responses...");

        const [mistralResponse, cohereResponse] = await Promise.all([
            MistralModel.invoke(userPrompt),
            CohereModel.invoke(userPrompt),
        ]);

        console.log("\nMistral Response:");
        console.log(mistralResponse.text);

        console.log("\nCohere Response:");
        console.log(cohereResponse.text);

        return {
            solution_1: mistralResponse.text,
            solution_2: cohereResponse.text,
        };
    } catch (error) {
        console.error("Solution Node Error:");
        console.error(error);
        throw error;
    } finally {
        console.log(" Solution Node Finished:- \n");
    }
};

/**
 * Evaluates both solutions using Gemini.
 */
const judgeNode: GraphNode<typeof State> = async (state) => {
    console.log("\n Judge Node:-");

    try {
        console.dir(state, { depth: null });

        const { solution_1, solution_2 } = state;

        if (!solution_1 || !solution_2) {
            throw new Error("Solutions are missing.");
        }

        console.log("\nCreating Gemini Judge...");

        const judge = createAgent({
            model: GeminiModel,
            tools: [],
            responseFormat: providerStrategy(
                z.object({
                    solution_1_score: z.number().min(0).max(10),
                    solution_2_score: z.number().min(0).max(10),
                })
            ),
        });

        console.log("Calling Gemini...");

        const judgeResponse = await Promise.race([
            judge.invoke({
                messages: [
                    new HumanMessage(`You are an impartial AI judge. Evaluate the following two responses.Response 1:${solution_1} Response 2: ${solution_2} Score each response between 0 and 10.Return ONLY the structured response.`),
                ],
            }),
            new Promise((_, reject) =>
                setTimeout(
                    () => reject(new Error("Gemini request timed out.")),
                    30000
                )
            ),
        ]);

        console.log("\nRaw Gemini Response:");
        console.dir(judgeResponse, { depth: null });

        const recommendation = (judgeResponse as any).structuredResponse;

        console.log("\nStructured Response:");
        console.dir(recommendation, { depth: null });

        if (!recommendation) {
            throw new Error(
                "Gemini did not return a structuredResponse."
            );
        }

        return {
            judge_recommendation: recommendation,
        };
    } catch (error) {
        console.error("\nJudge Node Error:");
        console.error(error);
        throw error;
    } finally {
        console.log("Judge Node Finished:- \n");
    }
};

/**
 * Graph Definition
 */
const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile();

/**
 * Graph Entry Point
 */
export default async function (userMessage: string) {
    console.log("\n Graph Execution Started:- ");

    try {
        if (!userMessage.trim()) {
            throw new Error("User message cannot be empty.");
        }

        const result = await graph.invoke({
            messages: [new HumanMessage(userMessage)],
        });

        console.log("\n Final Graph State:- ");
        console.dir(result, { depth: null });

        return result;
    } catch (error) {
        console.error("\nGraph Execution Failed:");
        console.error(error);
        throw error;
    } finally {
        console.log("\n Graph Execution Finished:- \n");
    }
}