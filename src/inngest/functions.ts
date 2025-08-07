import { gemini, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
     const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer. You summarize in 2 words.",
      model: gemini({ model: "gemini-1.5-flash", apiKey: process.env.GEMINI_API_KEY }),
    });

    const { output } = await summarizer.run(
  `Summarize the following text:${event.data.value}`,
);
    return { output };
  },
);