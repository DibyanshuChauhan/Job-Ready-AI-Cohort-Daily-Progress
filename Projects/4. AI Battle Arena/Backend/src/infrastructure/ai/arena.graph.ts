import { StateGraph, StateSchema, type GraphNode, START, END } from "@langchain/langgraph";
import { z } from "zod";
import { createAgent, HumanMessage, providerStrategy } from "langchain";
import { LLMProvider } from "./llm.provider.js";
import type { ArenaGraphResult } from "../../arena/types/arena.types.js";

// State passed between LangGraph nodes
const state = new StateSchema({
  problem: z.string().default(""),
  historyContext: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
  }),
});

// Run Mistral and Cohere concurrently to get two independent answers
const solutionNode: GraphNode<typeof state> = async (state) => {
  const mistral = LLMProvider.getMistral();
  const cohere = LLMProvider.getCohere();

  // Attach previous chat history if user is asking a follow-up question
  let prompt = state.problem;
  if (state.historyContext && state.historyContext.trim()) {
    prompt = `${state.historyContext}\n\nUser follow-up question: ${state.problem}`;
  }

  // Fetch responses in parallel
  const [mistralResponse, cohereResponse] = await Promise.all([
    mistral.invoke(prompt),
    cohere.invoke(prompt),
  ]);

  return {
    solution_1: mistralResponse.text,
    solution_2: cohereResponse.text,
  };
};

// Use Gemini as an unbiased judge to grade both solutions
const judgeNode: GraphNode<typeof state> = async (state) => {
  const gemini = LLMProvider.getGemini();
  const { problem, historyContext, solution_1, solution_2 } = state;

  const judge = createAgent({
    model: gemini,
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
      })
    ),
    systemPrompt: `You are a judge for a problem-solving competition. You will be given a problem (and optional prior conversation context) and two solutions by two different agents. Your task is to evaluate the solutions based on their correctness, efficiency, and clarity. Provide a score for each solution on a scale of 0 to 10, along with your reasoning for the scores.`,
  });

  const promptText = historyContext && historyContext.trim()
    ? `${historyContext}\n\nUser Question: ${problem}`
    : `Problem: ${problem}`;

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(`
        ${promptText}

        Solution 1: ${solution_1}

        Solution 2: ${solution_2}

        Please evaluate both solutions and provide scores and reasoning.
      `),
    ],
  });

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judgeResponse.structuredResponse;

  return {
    judge: {
      solution_1_score,
      solution_2_score,
      solution_1_reasoning,
      solution_2_reasoning,
    },
  };
};

// Build the workflow graph: START -> generate solutions -> judge -> END
const compiledGraph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile();

export class ArenaGraphEngine {
  // Execute the graph for a given user prompt and optional chat history context
  public static async execute(
    problem: string,
    historyContext: string = ""
  ): Promise<ArenaGraphResult> {
    const result = await compiledGraph.invoke({ problem, historyContext });
    return result as ArenaGraphResult;
  }
}
