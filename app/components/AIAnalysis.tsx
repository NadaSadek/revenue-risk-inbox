import { categoryLabel, revenueRiskLabel, urgencyLabel } from "@/lib/constants";
import type { RevenueRiskAnalysis } from "@/lib/types";

export default function AIAnalysis({ analysis }: { analysis: RevenueRiskAnalysis }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-slate-700">Summary</h3>
        <p className="mt-1 text-base text-slate-700">{analysis.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-slate-200 p-3">
          <p className="text-xs uppercase text-slate-500">Category</p>
          <p className="mt-1 text-sm font-medium">{categoryLabel[analysis.category]}</p>
        </div>

        <div className="rounded-md border border-slate-200 p-3">
          <p className="text-xs uppercase text-slate-500">Revenue Risk</p>
          <p className="mt-1 text-sm font-medium">{revenueRiskLabel[analysis.revenueRisk]}</p>
        </div>

        <div className="rounded-md border border-slate-200 p-3">
          <p className="text-xs uppercase text-slate-500">Urgency</p>
          <p className="mt-1 text-sm font-medium">{urgencyLabel[analysis.urgency]}</p>
        </div>

        <div className="rounded-md border border-slate-200 p-3">
          <p className="text-xs uppercase text-slate-500">Confidence</p>
          <p className="mt-1 text-sm font-medium">{Math.round(analysis.confidence * 100)}%</p>
        </div>
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-700">Evidence</h3>
        {analysis.evidence.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {analysis.evidence.map((evidenceItem, index) => (
              <li
                key={`${index}-${evidenceItem}`}
                className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                “{evidenceItem}”
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-500">No direct evidence provided.</p>
        )}
      </div>

      <div>
        <h3 className="text-base font-semibold text-slate-700">Suggested Next Action</h3>
        <p className="mt-1 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
          {analysis.suggestedNextAction}
        </p>
      </div>

      <div>
        <h3 className="text-base font-semibold text-slate-700">Suggested response</h3>
        <p className="mt-1 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
          {analysis.suggestedResponse ?? "No suggested response. Human review recommended."}
        </p>
      </div>
    </div>
  );
}
