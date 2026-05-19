import { severityBadgeClass } from "@/app/severity";
import { categoryLabel, revenueRiskLabel, urgencyLabel } from "@/lib/constants";
import type { RevenueRiskAnalysis } from "@/lib/types";

function SignalItem({
  label,
  value,
  className = "bg-slate-100 text-slate-600 ring-slate-200",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
      <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span
        className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${className}`}>
        {value}
      </span>
    </div>
  );
}

export default function AIAnalysis({ analysis }: { analysis: RevenueRiskAnalysis }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-sm font-semibold text-slate-950">Summary</h3>
        <p className="mt-1 text-sm leading-6 text-slate-700">{analysis.summary}</p>
      </section>
      <section>
        <h3 className="sr-only">AI signals</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <SignalItem
            label="Risk"
            value={revenueRiskLabel[analysis.revenueRisk]}
            className={severityBadgeClass[analysis.revenueRisk]}
          />
          <SignalItem
            label="Urgency"
            value={urgencyLabel[analysis.urgency]}
            className={severityBadgeClass[analysis.urgency]}
          />
          <SignalItem label="Category" value={categoryLabel[analysis.category]} />
          <SignalItem label="Confidence" value={`${Math.round(analysis.confidence * 100)}%`} />
        </div>
      </section>
      <section>
        <h3 className="text-sm font-semibold text-slate-950">Evidence</h3>

        {analysis.evidence.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {analysis.evidence.map((evidenceItem, index) => (
              <li
                key={`${index}-${evidenceItem}`}
                className="flex gap-2 text-sm leading-5 text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                <span>“{evidenceItem}”</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-500">No direct evidence provided.</p>
        )}
      </section>
      <section>
        <h3 className="text-sm font-semibold text-slate-950">Next Step</h3>

        <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50/60 px-3 py-2">
          <p className="text-sm leading-5 text-blue-950">{analysis.recommendedAction}</p>
        </div>
      </section>
    </div>
  );
}
