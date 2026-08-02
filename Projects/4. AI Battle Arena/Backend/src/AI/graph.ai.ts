import { StateGraph, StateSchema, type GraphNode, START, END } from "@langchain/langgraph";
import { z } from "zod";
import { mistralModel, cohereModel, geminiModel } from "./model.ai.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default(""),
    })
})

const solutionNode: GraphNode<typeof state> = async (state) => {

    const [mistralResponse, cohereResponse] = await Promise.all([
        mistralModel.invoke(state.problem),
        cohereModel.invoke(state.problem),
    ]);

    return {
        solution_1: mistralResponse.text,
        solution_2: cohereResponse.text,
    }
}

const judgeNode: GraphNode<typeof state> = async (state) => {

    const { problem, solution_1, solution_2 } = state;

    const judge = createAgent({
        model: geminiModel,
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_reasoning: z.string(),
            solution_2_reasoning: z.string(),
        })),
        systemPrompt: `You are a judge for a problem-solving competition. You will be given a problem and two solutions by two different agents. Your task is to evaluate the solutions based on their correctness, efficiency, and clarity. Provide a score for each solution on a scale of 0 to 10, along with your reasoning for the scores.`,
    })

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(`
                Problem: ${problem}\n\n
                Solution 1: ${solution_1}\n\n
                Solution 2: ${solution_2}\n\n
                Please evaluate both solutions and provide scores and reasoning.
                `)
        ]
    })

    const {
        solution_1_score,
        solution_2_score,
        solution_1_reasoning,
        solution_2_reasoning
    } = judgeResponse.structuredResponse

    return {
        judge: {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    }

}

const graph = new StateGraph(state)
    .addNode("solution", solutionNode)
    .addNode("judge_node", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge_node")
    .addEdge("judge_node", END)
    .compile()

export const runGraph = async (problem: string) => {

    const result = await graph.invoke({
        problem: problem
    })

    return result
}