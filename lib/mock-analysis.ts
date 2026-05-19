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
  msg_002: {
    messageId: "msg_002",
    summary: "Customer is confused about an invoice charge that seems higher than expected.",
    category: "invoice_issue",
    revenueRisk: "medium",
    urgency: "medium",
    confidence: 0.85,
    needsHumanReview: false,
    evidence: [
      "I was charged $120 but I thought it would be $100",
      "can you explain the extra $20 on my invoice?",
    ],
    recommendedAction:
      "Review the customer's invoice details, check for proration, tax, or seat count changes, and provide a clear explanation to the customer.",
  },
  msg_003: {
    messageId: "msg_003",
    summary: "Customer is giving feedback about a feature request.",
    category: "product_feedback",
    revenueRisk: "low",
    urgency: "low",
    confidence: 0.95,
    needsHumanReview: false,
    evidence: [
      "I would love to see a dark mode in your product",
      "it would make it easier for me to use at night",
    ],
    recommendedAction:
      "Thank the customer for their feedback and route to the product team for consideration in future updates.",
  },
};
