import { NextResponse } from "next/server";
import { supportMessages } from "@/lib/sample-data/messages";

export function GET() {
  return NextResponse.json({
    supportRequests: supportMessages,
  });
}
