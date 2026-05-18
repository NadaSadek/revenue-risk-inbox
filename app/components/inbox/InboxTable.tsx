"use client";

import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";
import { revenueRiskLabel, urgencyLabel } from "@/lib/constants";

export type SupportRequestRow = SupportRequest & {
  analysis?: RevenueRiskAnalysis;
};

export default function InboxTable({
  enrichedSupportRequests,
  selectedMessageId,
  onSelectRow,
}: {
  enrichedSupportRequests: SupportRequestRow[];
  selectedMessageId: SupportRequest["id"] | null;
  onSelectRow: (messageId: SupportRequest["id"]) => void;
}) {
  return (
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
                onClick={() => onSelectRow(request.id)}
                className={`cursor-pointer border-b border-slate-200 hover:bg-slate-50 ${
                  selectedMessageId === request.id ? "bg-slate-100" : ""
                }`}>
                <td className="px-4 py-3 text-slate-600">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectRow(request.id);
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
                  <span className="rounded-full bg-slate-100 px-2 py-1 font-medium">{urgency}</span>
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
  );
}
