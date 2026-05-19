import { severityBadgeClass, type Severity } from "@/components/ui/severity";

export default function Badge({ value, label }: { value?: Severity; label?: string }) {
  if (!value || !label) {
    return <span className="text-sm text-slate-400">—</span>;
  }

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ring-1 ${severityBadgeClass[value]}`}>
      {label}
    </span>
  );
}
