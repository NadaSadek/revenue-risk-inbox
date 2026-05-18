import { z } from "zod";

export const revenueRiskAnalysisSchema = z.object({
  urgency: z
    .enum(["low", "medium", "high"])
    .describe(
      "How quickly a support or success team should respond. Use high when the customer is blocked, threatening cancellation, losing access after payment, or reporting a revenue-impacting failure. Use medium when the issue needs follow-up but is not immediately business-critical. Use low for general feedback or non-blocking issues."
    ),
  revenueRisk: z
    .enum(["low", "medium", "high"])
    .describe(
      "Risk that the company may lose revenue, fail to collect payment, lose an account, or create billing-related churn. Use high for failed payments, paid users locked out, cancellation threats, refund demands, or enterprise sales risk. Use medium for invoice disputes, unclear billing confusion, or product bugs affecting paid usage. Use low for general product feedback or low-commercial-impact issues."
    ),
  summary: z
    .string()
    .max(240)
    .describe(
      "One concise sentence summarizing the customer issue and its business impact. Do not invent facts that are not present in the message."
    ),
  recommendedAction: z
    .string()
    .max(280)
    .describe(
      "The next best operational action for a support, billing, or customer success teammate. Be specific and practical. Do not give generic advice like 'look into it' unless no better action is possible."
    ),
  evidence: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe(
      "Short direct phrases from the customer message that justify the urgency, revenue risk, or category. Use exact wording where possible. Do not add evidence that is not in the message."
    ),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "Confidence that the classification is correct. Use values near 1 when the message is explicit. Use lower values when the message is ambiguous, lacks detail, or could fit multiple categories."
    ),
  needsHumanReview: z
    .boolean()
    .describe(
      "True if confidence is below 0.7, revenueRisk is high, the customer is threatening cancellation, requesting a refund, disputing an invoice, or reporting paid access being blocked."
    ),
  category: z
    .enum([
      "failed_payment",
      "invoice_issue",
      "plan_access",
      "cancellation_risk",
      "refund_request",
      "enterprise_sales",
      "product_bug",
      "account_issue",
      "product_feedback",
      "other",
    ])
    .describe(
      "Primary category of the customer message. Choose the most commercially relevant category when multiple apply. Use other only when none of the listed categories fit."
    ),
});


export type RevenueRiskAnalysis = z.infer<typeof revenueRiskAnalysisSchema>;
