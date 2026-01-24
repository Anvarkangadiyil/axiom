import { NextRequest } from "next/server";
import { generateText } from "ai";
import {google} from "@ai-sdk/google";

export async function POST(req: NextRequest) {
  const response = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  return new Response(JSON.stringify(response));
}
