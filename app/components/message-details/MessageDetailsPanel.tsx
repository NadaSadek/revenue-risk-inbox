"use client";

import { useEffect } from "react";
import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";
import AIAnalysis from "@/app/components/message-details/AIAnalysis";
import ReviewActions from "@/app/components/message-details/ReviewActions";

type MessageDetailsPanelProps = {
  message: SupportRequest;
  analysis: RevenueRiskAnalysis | null;
  onClose: () => void;
};

export function MessageDetailsPanel({ message, analysis, onClose }: MessageDetailsPanelProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-details-title">
      <div className="absolute inset-0 bg-slate-950/25" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex h-full w-full max-w-xl flex-col bg-white shadow-xl">
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 id="message-details-title" className="text-lg font-semibold text-slate-950">
              Customer Support Request Details
            </h2>
            {analysis?.needsHumanReview && (
              <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
                Needs review
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400">
            ✕
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-6 pb-8">
          <section className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                {message.customerName} · {message.companyName}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(message.receivedAt).toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-950">{message.subject}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{message.body}</p>
            </div>
          </section>
          <section className="mt-5 border-t border-slate-200 pt-5">
            <h2 className="mb-3 text-base font-semibold text-slate-950">AI Review</h2>
            {analysis ? (
              <AIAnalysis analysis={analysis} />
            ) : (
              <p className="text-sm text-slate-600">
                No analysis yet. Run batch analysis to classify this message.
              </p>
            )}
          </section>
        </div>
        {analysis?.needsHumanReview && (
          <footer className="shrink-0 border-t border-slate-200 bg-white px-3 py-2">
            <ReviewActions />
          </footer>
        )}
      </aside>
    </div>
  );
}
