import { describe, expect, it } from "vitest";
import { orderAnalysesBySupportRequestIds } from "@/lib/ai/orderAnalysesBySupportRequestIds";
import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";

const mockSupportRequests: SupportRequest[] = [
  {
    id: "1",
    subject: "Issue A",
    body: "Details about issue A",
    customerName: "Jane Smith",
    companyName: "Widgets Inc",
    receivedAt: "2026-05-16T08:42:00Z",
  },
  {
    id: "2",
    subject: "Issue B",
    body: "Details about issue B",
    customerName: "John Doe",
    companyName: "Acme Corp",
    receivedAt: "2026-05-16T09:18:00Z",
  },
  {
    id: "3",
    subject: "Issue C",
    body: "Details about issue C",
    customerName: "Alice Johnson",
    companyName: "Globex Corp",
    receivedAt: "2026-05-16T10:05:00Z",
  },
];

const mockAnalyses: RevenueRiskAnalysis[] = [
  {
    messageId: "2",
    category: "failed_payment",
    confidence: 0.9,
    needsHumanReview: false,
    revenueRisk: "high",
    urgency: "high",
    summary: "Payment failed.",
    evidence: ["payment failed"],
    recommendedAction: "Check billing status.",
  },
  {
    messageId: "1",
    category: "invoice_issue",
    confidence: 0.8,
    needsHumanReview: false,
    revenueRisk: "medium",
    urgency: "medium",
    summary: "Invoice issue.",
    evidence: ["invoice issue"],
    recommendedAction: "Review invoice.",
  },
  {
    messageId: "3",
    category: "other",
    confidence: 0.5,
    needsHumanReview: true,
    revenueRisk: "low",
    urgency: "low",
    summary: "General support issue.",
    evidence: ["support issue"],
    recommendedAction: "Route to support.",
  },
];

describe("orderAnalysesBySupportRequestIds", () => {
  it("returns analyses in the same order as the support requests", () => {
    const orderedAnalyses = orderAnalysesBySupportRequestIds(mockSupportRequests, mockAnalyses);

    expect(orderedAnalyses.map((analysis) => analysis.messageId)).toEqual(["1", "2", "3"]);
  });

  it("throws when the analyses contain duplicate message ids", () => {
    const duplicateAnalyses: RevenueRiskAnalysis[] = [
      mockAnalyses[1],
      {
        ...mockAnalyses[0],
        messageId: "1",
      },
      mockAnalyses[2],
    ];

    expect(() => orderAnalysesBySupportRequestIds(mockSupportRequests, duplicateAnalyses)).toThrow(
      "AI analysis response contained duplicate message ids."
    );
  });

  it("throws when the number of analyses does not match the number of support requests", () => {
    expect(() =>
      orderAnalysesBySupportRequestIds(mockSupportRequests, mockAnalyses.slice(0, 2))
    ).toThrow("AI analysis response did not match the number of support requests.");
  });

  it("throws when an analysis is missing for a support request", () => {
    expect(() =>
      orderAnalysesBySupportRequestIds(mockSupportRequests.slice(1, 2), mockAnalyses.slice(1, 2))
    ).toThrow("AI analysis response is missing message id: 2");
  });
});
