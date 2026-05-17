"use client";

import { useState } from "react";
import { type SupportMessage, supportMessages } from "../../lib/sample-data/messages";
import { MessageDetailsPanel } from "./MessageDetailsPanel";
import type { RevenueRiskAnalysis } from "@/lib/types";
import { mockAnalysisByMessageId } from "@/lib/mock-analysis";
import { revenueRiskLabel, urgencyLabel } from "@/lib/constants";

export default function InboxTable() {
  const [selectedMessageId, setSelectedMessageId] = useState<SupportMessage["id"] | null>(null);
  const [analysisByMessageId, setAnalysisByMessageId] = useState<
    Partial<Record<SupportMessage["id"], RevenueRiskAnalysis>>
  >({});

  const onClosePanel = () => {
    setSelectedMessageId(null);
    setAnalysisByMessageId({});
  };

  const enrichedMessages: (SupportMessage & { analysis?: RevenueRiskAnalysis })[] =
    supportMessages.map((message) => ({
      ...message,
      analysis: analysisByMessageId[message.id],
    }));

  const selectedAnalysis = selectedMessageId
    ? (analysisByMessageId[selectedMessageId] ?? null)
    : null;

  const selectedMessage = supportMessages.find((m) => m.id === selectedMessageId);
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
        className="mb-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => setAnalysisByMessageId(mockAnalysisByMessageId)}>
        Analyze Messages
      </button>
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
            {enrichedMessages.map((message) => {
              const urgency = message.analysis ? urgencyLabel[message.analysis.urgency] : "-";
              const revenueRisk = message.analysis
                ? revenueRiskLabel[message.analysis.revenueRisk]
                : "-";
              return (
                <tr
                  key={message.id}
                  onClick={() => setSelectedMessageId(message.id)}
                  className={`cursor-pointer border-b border-slate-200 hover:bg-slate-50 ${
                    selectedMessageId === message.id ? "bg-slate-100" : ""
                  }`}>
                  <td className="px-4 py-3 text-slate-600">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedMessageId(message.id);
                      }}
                      className="cursor-pointer block max-w-md rounded-sm text-left font-medium text-slate-900">
                      {message.subject}
                      <span className="sr-only">
                        Open message details for {message.customerName} at {message.companyName}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{message.customerName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{message.companyName}</td>
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
                    {message.analysis ? "Analyzed" : "Not analyzed"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(message.receivedAt).toLocaleString()}
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
