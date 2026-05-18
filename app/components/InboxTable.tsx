"use client";

import { useState } from "react";
import { MessageDetailsPanel } from "./MessageDetailsPanel";
import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";
import { revenueRiskLabel, urgencyLabel } from "@/lib/constants";
import { useGetSupportRequests } from "@/app/hooks/useGetSupportRequests";
import { useAnalyzeSupportRequests } from "@/app/hooks/useAnalyzeSupportRequests";

export default function InboxTable() {
  const [selectedMessageId, setSelectedMessageId] = useState<SupportRequest["id"] | null>(null);
  const [analysisByMessageId, setAnalysisByMessageId] = useState<
    Partial<Record<SupportRequest["id"], RevenueRiskAnalysis>>
  >({});

  const {
    supportRequests,
    isLoading: isLoadingSupportRequests,
    error: supportRequestsError,
  } = useGetSupportRequests();

  const { analyzeSupportRequests, isAnalyzing, error: analysisError } = useAnalyzeSupportRequests();

  async function handleAnalyzeMessages() {
    const analysesByMessageId = await analyzeSupportRequests(supportRequests.slice(0, 5));

    if (!analysesByMessageId) {
      return;
    }

    setAnalysisByMessageId(analysesByMessageId);
  }

  const onClosePanel = () => {
    setSelectedMessageId(null);
  };

  const enrichedSupportRequests: (SupportRequest & { analysis?: RevenueRiskAnalysis })[] =
    supportRequests.map((request) => ({
      ...request,
      analysis: analysisByMessageId[request.id],
    }));

  const selectedAnalysis = selectedMessageId
    ? (analysisByMessageId[selectedMessageId] ?? null)
    : null;

  const selectedMessage = supportRequests.find((m) => m.id === selectedMessageId);

  if (isLoadingSupportRequests) {
    return <div className="p-4 text-sm text-slate-600">Loading support requests...</div>;
  }

  if (supportRequestsError) {
    return (
      <div className="p-4 text-sm text-red-700">Something went wrong. Please try again later!</div>
    );
  }

  return (
    <div className="p-4">
      {selectedMessage && (
        <MessageDetailsPanel
          message={selectedMessage}
          analysis={selectedAnalysis}
          onClose={onClosePanel}
        />
      )}
      <button
        type="button"
        disabled={isAnalyzing || supportRequests.length === 0}
        className="mb-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => handleAnalyzeMessages()}>
        {isAnalyzing ? "Analyzing batch" : "Analyze Batch (max 5)"}
      </button>
      {isAnalyzing && (
        <p className="mb-4 text-sm text-slate-600">
          Running AI analysis for the current batch. This may take a moment.
        </p>
      )}
      {analysisError && <p className="mb-4 text-sm text-red-700">{analysisError}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-slate-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-slate-200 px-4 py-2 text-left">Subject</th>
              <th className="border border-slate-200 px-4 py-2 text-left">Customer</th>
              <th className="border border-slate-200 px-4 py-2 text-left">Company</th>
              <th className="border border-slate-200 px-4 py-2 text-left">Urgency</th>
              <th className="border border-slate-200 px-4 py-2 text-left">Revenue Risk</th>
              <th className="border border-slate-200 px-4 py-2 text-left">Review</th>
              <th className="border border-slate-200 px-4 py-2 text-left">AI Status</th>
              <th className="border border-slate-200 px-4 py-2 text-left">Received</th>
            </tr>
          </thead>
          <tbody>
            {enrichedSupportRequests.map((request) => {
              const urgency = request.analysis ? urgencyLabel[request.analysis.urgency] : "-";
              const revenueRisk = request.analysis
                ? revenueRiskLabel[request.analysis.revenueRisk]
                : "-";
              return (
                <tr
                  key={request.id}
                  onClick={() => setSelectedMessageId(request.id)}
                  className={`cursor-pointer border-b border-slate-200 hover:bg-slate-50 ${
                    selectedMessageId === request.id ? "bg-slate-100" : ""
                  }`}>
                  <td className="px-4 py-3 text-slate-600">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedMessageId(request.id);
                      }}
                      className="block max-w-md cursor-pointer rounded-sm text-left font-medium text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400">
                      {request.subject}
                      <span className="sr-only">
                        Open message details for {request.customerName} at {request.companyName}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{request.customerName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{request.companyName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <span className="rounded-full bg-slate-100 px-2 py-1 font-medium">
                      {urgency}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <span className="rounded-full bg-slate-100 px-2 py-1 font-medium">
                      {revenueRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">Not reviewed</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {request.analysis ? "Analyzed" : "Not analyzed"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(request.receivedAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
