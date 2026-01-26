import { inngest } from "@/inngest/client";
import { firecrawl } from "@/lib/firecrawl";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    const { prompt } = event.data as { prompt: string };

    //extract all urls from prompt
    const urls = (await step.run("extract-urls", async () => {
      return prompt.match(URL_REGEX) ?? [];
    })) as string[];

    //scrape urls
    const scrapedContent = await step.run("scrape-urls", async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          const doc = await firecrawl.scrape(url, { formats: ["markdown"] });
          return doc.markdown ?? null;
        }),
      );
      return results.filter(Boolean).join("\n\n");
    });

    //create final prompt with scraped content
    const finalPrompt = scrapedContent
      ? `Context:\n${scrapedContent}\n\nQuestion:${prompt}`
      : prompt;

    //generate using final prmbt
    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-2.5-flash"),
        prompt: finalPrompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      });
    });
  },
);

export const demoError = inngest.createFunction(
  { id: "demo-error" },
  { event: "demo/error" },
  async ({ event, step }) => {
    await step.run("fail", async () => {
      throw new Error("Inngest Error");
    });
  },
);
