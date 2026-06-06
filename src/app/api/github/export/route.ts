
import { inngest } from "@/inngest/client";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import z from "zod";




const requestSchema = z.object({
    projectId: z.string(),
    repoName: z.string().min(1).max(100),
    visibility: z.enum(["private", "public"]).default("private"),
    description: z.string().max(350).optional()
})


export async function POST(request: Request) {

    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const body = await request.json();
    const { projectId, repoName, description, visibility } = requestSchema.parse(body);


    const client = await clerkClient();
    const token = await client.users.getUserOauthAccessToken(
        userId,
        "github"
    );

    const githubToken = token.data?.[0]?.token;

    if (!githubToken) {
        return NextResponse.json({ error: "GitHub not connected, Please reconnect your GitHub account" }, { status: 401 });
    }


    const internalKey = process.env.CONVEX_INTERNAL_KEY;
    if (!internalKey) {
        return NextResponse.json({
            error: "Server configuration error, Please try again later"

        }, {
            status: 500
        })
    }

    const event = await inngest.send(
        {
            name: "github/export.repo",
            data: {
                projectId,
                repoName,
                visibility,
                description,
                githubToken,
                internalKey
            }
        }
    );

    console.log("Export event sent", event);

    return NextResponse.json({ success: true, eventId: event.ids[0] });


}