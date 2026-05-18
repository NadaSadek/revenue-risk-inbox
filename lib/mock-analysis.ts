import type { RevenueRiskAnalysis } from "./types";

export const mockAnalysisByMessageId: Record<string, RevenueRiskAnalysis> = {
  msg_001: {
    messageId: "msg_001",
    summary:
      "Customer reports a failed renewal payment and needs help restoring billing continuity.",
    category: "failed_payment",
    revenueRisk: "high",
    urgency: "high",
    confidence: 0.91,
    needsHumanReview: true,
    evidence: [
      "card failed during renewal",
      "nothing changed on our side",
      "please help us avoid losing access",
    ],
    recommendedAction:
      "Route to billing support and check the failed renewal payment, retry status and account access risk.",
  },
};
