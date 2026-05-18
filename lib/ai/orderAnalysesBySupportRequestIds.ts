import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";

export function orderAnalysesBySupportRequestIds(
  supportRequests: SupportRequest[],
  analyses: RevenueRiskAnalysis[]
): RevenueRiskAnalysis[] {
  const analysisById = new Map(analyses.map((analysis) => [analysis.messageId, analysis]));

  if (analysisById.size !== analyses.length) {
    throw new Error("AI analysis response contained duplicate message ids.");
  }

  if (analyses.length !== supportRequests.length) {
    throw new Error("AI analysis response did not match the number of support requests.");
  }

  return supportRequests.map((request) => {
    const analysis = analysisById.get(request.id);

    if (!analysis) {
      throw new Error(`AI analysis response is missing message id: ${request.id}`);
    }

    return analysis;
  });
}
