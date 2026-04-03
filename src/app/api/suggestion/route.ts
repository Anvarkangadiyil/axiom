import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { groq } from "@ai-sdk/groq";

/**
 * Zod Schema
 */
const suggestionSchema = z.object({
  suggestion: z.string(),
});

/**
 * Safely extract JSON from model output
 * Handles:
 * - <think> blocks
 * - markdown ```json
 * - extra text
 */
function extractJSON(text: string) {
  try {
    if (!text) return null;

    // Remove <think> reasoning
    text = text.replace(
      /<think>[\s\S]*?<\/think>/g,
      ""
    );

    // Remove markdown fences
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    // Extract JSON object
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) return null;

    return JSON.parse(match[0]);

  } catch (error) {

    console.warn(
      "JSON extraction failed:",
      error
    );

    return null;
  }
}

/**
 * Prompt
 */
const SUGGESTION_PROMPT = `You are a code suggestion assistant.

Return ONLY valid JSON.

Do NOT include reasoning.
Do NOT include <think>.
Do NOT include explanations.

Format:

{
  "suggestion": string
}

<context>
<file_name>{fileName}</file_name>

<previous_lines>
{previousLines}
</previous_lines>

<current_line number="{lineNumber}">
{currentLine}
</current_line>

<before_cursor>
{textBeforeCursor}
</before_cursor>

<after_cursor>
{textAfterCursor}
</after_cursor>

<next_lines>
{nextLines}
</next_lines>

<full_code>
{code}
</full_code>

</context>

Follow steps:

1. If next_lines continues → return empty string
2. If before_cursor ends with ; } ) → return empty
3. Otherwise suggest next code

Return JSON only.
`;

export async function POST(req: Request) {
  try {
    /**
     * Auth check
     */
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    /**
     * Parse body
     */
    const body = await req.json();

    const {
      fileName,
      previousLines,
      currentLine,
      textBeforeCursor,
      textAfterCursor,
      lineNumber,
      nextLines,
      code,
    } = body;

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    /**
     * Build prompt safely
     */
    const prompt = SUGGESTION_PROMPT
      .replace("{fileName}", fileName ?? "")
      .replace("{previousLines}", previousLines ?? "")
      .replace("{currentLine}", currentLine ?? "")
      .replace("{textBeforeCursor}", textBeforeCursor ?? "")
      .replace("{textAfterCursor}", textAfterCursor ?? "")
      .replace("{nextLines}", nextLines ?? "")
      .replace("{lineNumber}", String(lineNumber ?? 0))
      .replace("{code}", code ?? "");

    let suggestion = "";

    try {

      const result = await generateText({
        model: groq("qwen/qwen3-32b"),

        prompt,

        temperature: 0.1,

      
      });

      /**
       * Extract JSON safely
       */
      const parsed =
        extractJSON(result.text);

      if (parsed) {

        const validated =
          suggestionSchema.parse(parsed);

        suggestion =
          validated.suggestion ?? "";

      } else {

        console.warn(
          "No JSON detected from Qwen"
        );

        throw new Error(
          "Invalid Qwen response"
        );
      }

    } catch (qwenError) {

      console.warn(
        "Qwen generation failed, falling back to Gemini:",
        qwenError
      );

    
    }

    /**
     * Return response
     */
    return NextResponse.json({
      suggestion,
    });

  } catch (error) {

    console.error(
      "Suggestion API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to generate suggestion",
      },
      { status: 500 }
    );
  }
}