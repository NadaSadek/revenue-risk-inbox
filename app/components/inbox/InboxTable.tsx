import { revenueRiskLabel, urgencyLabel } from "@/lib/constants";
import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";
import Badge from "../ui/Badge";

export type SupportRequestRow = SupportRequest & {
  analysis?: RevenueRiskAnalysis;
};

type InboxTableProps = {
  enrichedSupportRequests: SupportRequestRow[];
  selectedMessageId: SupportRequest["id"] | null;
  onSelectRow: (messageId: SupportRequest["id"]) => void;
};

export default function InboxTable({
  enrichedSupportRequests,
  selectedMessageId,
  onSelectRow,
}: InboxTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Company
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Urgency
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Revenue Risk
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Triage
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Received
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {enrichedSupportRequests.map((request) => {
              const isSelected = selectedMessageId === request.id;
              return (
                <tr
                  key={request.id}
                  onClick={() => onSelectRow(request.id)}
                  className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                    isSelected ? "bg-blue-50/60" : ""
                  }`}>
                  <td className="max-w-md px-4 py-4 align-top">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectRow(request.id);
                      }}
                      className="block text-left text-sm font-medium leading-6 text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                      {request.subject}
                      <span className="sr-only">
                        Open message details for {request.customerName} at {request.companyName}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-slate-600">
                    {request.customerName}
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-slate-600">
                    {request.companyName}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <Badge
                      value={request.analysis?.urgency}
                      label={request.analysis ? urgencyLabel[request.analysis.urgency] : undefined}
                    />
                  </td>
                  <td className="px-4 py-4 align-top">
                    <Badge
                      value={request.analysis?.revenueRisk}
                      label={
                        request.analysis
                          ? revenueRiskLabel[request.analysis.revenueRisk]
                          : undefined
                      }
                    />
                  </td>
                  <td className="px-4 py-4 align-top text-sm">
                    {!request.analysis ? (
                      <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                        Not analyzed
                      </span>
                    ) : request.analysis.needsHumanReview ? (
                      <span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
                        Needs review
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                        Auto-triaged
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-slate-500">
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
