import { inngest } from "@/inngest/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) { 
     
    await inngest.send({
      name:"demo/error",
      data:{}
    })
    
 return Response.json({status:"started"}); 
} 
     