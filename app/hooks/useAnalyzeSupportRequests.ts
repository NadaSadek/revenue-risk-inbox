"use client";

import { useState } from "react";
import { analyzeSupportRequestsResponseSchema } from "@/lib/ai/schema";
import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";

type AnalysisByMessageId = Record<SupportRequest["id"], RevenueRiskAnalysis>;

type UseAnalyzeSupportRequestsResult = {
  analyzeSupportRequests: (
    supportRequests: SupportRequest[]
  ) => Promise<AnalysisByMessageId | null>;
  isAnalyzing: boolean;
  error: string | null;
};

export function useAnalyzeSupportRequests(): UseAnalyzeSupportRequestsResult {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyzeSupportRequests(
    supportRequests: SupportRequest[]
  ): Promise<AnalysisByMessageId | null> {
    try {
      setIsAnalyzing(true);
      setError(null);

      const response = await fetch("/api/analyze-support-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ supportRequests }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze support requests.");
      }


      const data = await response.json();
      const parsed = analyzeSupportRequestsResponseSchema.parse(data);
      return Object.fromEntries(parsed.analyses.map((analysis) => [analysis.messageId, analysis]));
    } catch {
      setError("Could not analyze support requests.");
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }

  return {
    analyzeSupportRequests,
    isAnalyzing,
    error,
  };
}
