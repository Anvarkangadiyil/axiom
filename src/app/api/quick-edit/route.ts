import { z } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { firecrawl } from "@/lib/firecrawl";
import { generateText, Output } from "ai";
import { groq } from "@ai-sdk/groq";

const quickEditSchema = z.object({
  editedCode: z
    .string()
    .describe("The edited ver of the seletd code based on the instruction"),
});

const URL_REGEX = /http?:\/\/[^\s)]+/g;

const QUICK_EDIT_PROMPT = `You are a code editing assistant. Edit the selected code based on the user's instruction.

<context>
<selected_code>
{selectedCode}
</selected_code>
<full_code_context>
{fullCode}
</full_code_context>
</context>

{documentation}

<instruction>
{instruction}
</instruction>

<instructions>
Return ONLY the edited version of the selected code.
Maintain the same indentation level as the original.
Do not include any explanations or comments unless requested.
If the instruction is unclear or cannot be applied, return the original code unchanged.
</instructions>`;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { selectedCode, fullCode, instruction } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!selectedCode) {
      return NextResponse.json(
        { error: "No selected code provided" },
        { status: 400 },
      );
    }

    if (!instruction) {
      return NextResponse.json(
        { error: "No instruction provided" },
        { status: 400 },
      );
    }

    const urls: string[] = selectedCode.match(URL_REGEX) || [];

    let documentContext = "";

    if (urls.length > 0) {
      const scrappedResults = await Promise.all(
        urls.map(async (url) => {
          try {
            const doc = await firecrawl.scrape(url, { formats: ["markdown"] });
            if (doc.markdown) {
              return `<doc url="${url}">\n${doc.markdown}\n</doc>`;
            }
            return null;
          } catch (error) {
            return null;
          }
        }),
      );

      const validResults = scrappedResults.filter(Boolean);

      if (validResults.length > 0) {
        documentContext = `<documentation>\n${validResults.join("\n")}\n</documentation>`;
      }
    }

    const prompt = QUICK_EDIT_PROMPT.replace("{selectedCode}", selectedCode)
      .replace("{fullCode}", fullCode)
      .replace("{instruction}", instruction)
      .replace("{documentation}", documentContext);

    // //TODO: CHANGE MODEL
    // const { output } = await generateText({
    //   model: google("gemini-2.5-flash"),
    //   output: Output.object({
    //     schema: quickEditSchema,
    //   }),
    //   prompt,
    // });
    
    const { output } = await generateText({
      model: groq("openai/gpt-oss-20b"),
      output: Output.object({ schema: quickEditSchema }),
      prompt,
    });

    return NextResponse.json({ editedCode: output.editedCode });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to edit code" }, { status: 500 });
  }
}
