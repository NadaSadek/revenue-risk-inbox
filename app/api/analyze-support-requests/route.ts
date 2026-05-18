import { NextResponse } from "next/server";
import { analyzeSupportRequests } from "@/lib/ai/analyzeSupportRequests";
import { analyzeSupportRequestsBodySchema } from "@/lib/ai/schema";

export async function POST(request: Request) {
  try {
    if (!process.env.AI_GATEWAY_API_KEY) {
      return NextResponse.json({ error: "Missing AI Gateway API key." }, { status: 500 });
    }

    const body = await request.json();
    const result = analyzeSupportRequestsBodySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid support request payload.", issues: result.error.issues },
        { status: 400 }
      );
    }

    const analyses = await analyzeSupportRequests(result.data.supportRequests);

    return NextResponse.json({ analyses });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    console.error("Failed to analyze support requests", error);

    return NextResponse.json({ error: "Failed to analyze support requests." }, { status: 500 });
  }
}
