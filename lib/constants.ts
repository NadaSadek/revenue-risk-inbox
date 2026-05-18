import { RevenueRiskAnalysis } from "./types";

export const categoryLabel = {
  failed_payment: "Failed Payment",
  invoice_issue: "Invoice Issue",
  plan_access: "Plan Access",
  cancellation_risk: "Cancellation Risk",
  refund_request: "Refund Request",
  enterprise_sales: "Enterprise Sales",
  product_bug: "Product Bug",
  account_issue: "Account Issue",
  product_feedback: "Product Feedback",
  other: "Other",
} as const satisfies Record<RevenueRiskAnalysis["category"], string>;

export const revenueRiskLabel = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const satisfies Record<RevenueRiskAnalysis["revenueRisk"], string>;

export const urgencyLabel = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const satisfies Record<RevenueRiskAnalysis["urgency"], string>;
