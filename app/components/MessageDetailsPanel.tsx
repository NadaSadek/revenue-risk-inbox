import type { RevenueRiskAnalysis } from "@/lib/types";
import type { SupportMessage } from "@/lib/sample-data/messages";
import AIAnalysis from "./AIAnalysis";
import ReviewActions from "./ReviewActions";

export function MessageDetailsPanel({
  message,
  onClose,
  analysis,
}: {
  message: SupportMessage;
  analysis: RevenueRiskAnalysis | null;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-details-title">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex h-full w-full max-w-2xl flex-col bg-white shadow-xl">
        <header className="shrink-0 flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="message-details-title" className="text-lg font-semibold">
            Message Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-md p-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400">
            ✕
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <p className="mb-4 text-sm">
            From: {message.customerName} at {message.companyName}
          </p>

          <p className="mb-6 text-sm text-gray-600">
            Received: {new Date(message.receivedAt).toLocaleString()}
          </p>

          <div className="rounded bg-gray-50 p-4">
            <p className="mb-2 text-base font-semibold">{message.subject}</p>
            <p>{message.body}</p>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h2 className="mb-3 text-lg font-semibold">AI Review</h2>

            {analysis ? (
              <AIAnalysis analysis={analysis} />
            ) : (
              <p className="text-sm text-gray-600">
                No analysis yet. Run batch analysis to classify this message.
              </p>
            )}
          </div>
        </div>
        {analysis && (
          <footer className="shrink-0 border-t border-slate-200 px-6 py-4">
            <ReviewActions />
          </footer>
        )}
      </aside>
    </div>
  );
}
