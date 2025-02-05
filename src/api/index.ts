import { openai } from "@ai-sdk/openai";
import { cors } from "@elysiajs/cors";
import { type Message, streamText } from "ai";
import { Elysia } from "elysia";

export const api = new Elysia();

api.use(cors());

api.post("/api/chat", async ({ body, set }) => {
  const { messages } = body as { messages: Message[] };


  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: "You are a helpful assistant.",
    messages: messages
  });

  set.headers = {
    "X-Vercel-AI-Data-Stream": "v1",
    "Content-Type": "text/plain; charset=utf-8",
  };

  return result.toDataStream();
});
