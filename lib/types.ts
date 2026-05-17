export type RevenueRiskAnalysis = {
  summary: string;
  category:
    | "failed_payment"
    | "invoice_issue"
    | "plan_access"
    | "cancellation_risk"
    | "refund_request"
    | "enterprise_sales"
    | "product_bug"
    | "account_issue"
    | "product_feedback"
    | "other";
  revenueRisk: "none" | "low" | "medium" | "high";
  urgency: "low" | "medium" | "high";
  confidence: number;
  needsHumanReview: boolean;
  evidence: string[];
  suggestedNextAction?: string;
  suggestedResponse?: string;
};
