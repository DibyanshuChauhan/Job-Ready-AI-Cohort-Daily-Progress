import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, ReducedValue, StateGraph, START, END } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { z } from "zod";
import { CohereModel, MistralModel, GeminiModel } from "./ai.models.service.js";
import { createAgent, providerStrategy } from "langchain";

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    judge_recommendation: new ReducedValue(z.object().default({
        solution_1_score: 0,
        solution_2_score: 0,
    }),
        {
            reducer: (current, next) => {
                return next
            }
        }
    )
})

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {
    console.log(state)
    const [mistral_solution, cohere_solution] = await Promise.all([
        MistralModel.invoke(state.messages[0].text),
        CohereModel.invoke(state.messages[0].text)
    ])
    return {
        solution_1: mistral_solution.text,
        solution_2: cohere_solution.text,
    }
}

const judgeNode: GraphNode<typeof State> = async (state: typeof State) => {
    console.log('invoking judge with state,' ,state)
    const { solution_1, solution_2 } = state;
    const judge = createAgent({
        model: GeminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        }))
    })
    const judge_response = await judge.invoke({
        messages: [
            new HumanMessage(
                `You are a judge for an AI battle. You have two solutions to evaluate in between 0 and 10, where 0 is the worst and 10 is the best. the first solution is: ${solution_1}. The second solution is: ${solution_2}. Please provide your evaluation`
            )
        ]
    })
    const result = judge_response.structuredResponse
    return {
        judge_recommendation: result
    }
}

const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("solution", END)
    .compile();

export default async function (userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    })
    console.log(result)
    return result.messages
}