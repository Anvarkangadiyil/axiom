import { NextRequest } from "next/server";
import { generateText } from "ai";
import {google} from "@ai-sdk/google";
import { inngest } from "@/inngest/client";

export async function POST(req: NextRequest) {
  
  await inngest.send({
    name:"demo/generate",
    data:{}
  })
  return Response.json({status:"started"});
}
