"use client";

const ANALYSIS_BATCH_SIZE = 5;

import { useState } from "react";
import { MessageDetailsPanel } from "@/app/components/MessageDetailsPanel";
import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";
import { useGetSupportRequests } from "@/app/hooks/useGetSupportRequests";
import { useAnalyzeSupportRequests } from "@/app/hooks/useAnalyzeSupportRequests";
import InboxToolbar from "@/app/components/inbox/InboxToolbar";
import InboxTable, { type SupportRequestRow } from "@/app/components/inbox/InboxTable";

export default function InboxView() {
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

  const handleAnalyzeMessages = async () => {
    const analysesByMessageId = await analyzeSupportRequests(
      supportRequests.slice(0, ANALYSIS_BATCH_SIZE)
    );

    if (!analysesByMessageId) {
      return;
    }

    setAnalysisByMessageId(analysesByMessageId);
  };

  const onClosePanel = () => {
    setSelectedMessageId(null);
  };

  const enrichedSupportRequests: SupportRequestRow[] = supportRequests.map((request) => ({
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
      <InboxToolbar
        isAnalyzing={isAnalyzing}
        supportRequestsCount={supportRequests.length}
        analyzedCount={Object.keys(analysisByMessageId).length}
        batchSize={ANALYSIS_BATCH_SIZE}
        analysisError={analysisError}
        onAnalyze={handleAnalyzeMessages}
      />
      <InboxTable
        enrichedSupportRequests={enrichedSupportRequests}
        selectedMessageId={selectedMessageId}
        onSelectRow={setSelectedMessageId}
      />
    </div>
  );
}
