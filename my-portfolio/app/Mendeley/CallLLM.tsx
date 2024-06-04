import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";

  
const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});
