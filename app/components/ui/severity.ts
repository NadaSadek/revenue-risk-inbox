export type Severity = "low" | "medium" | "high";

export const severityBadgeClass = {
  high: "bg-red-50 text-red-700 ring-red-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  low: "bg-slate-100 text-slate-600 ring-slate-200",
} satisfies Record<Severity, string>;
