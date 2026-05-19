"use client";

import { useState } from "react";
import { MessageDetailsPanel } from "@/app/components/message-details/MessageDetailsPanel";
import type { RevenueRiskAnalysis, SupportRequest } from "@/lib/types";
import { useSupportRequests } from "@/app/hooks/useSupportRequests";
import { useAnalyzeSupportRequests } from "@/app/hooks/useAnalyzeSupportRequests";
import InboxToolbar from "@/app/components/inbox/InboxToolbar";
import InboxTable, { type SupportRequestRow } from "@/app/components/inbox/InboxTable";

const ANALYSIS_BATCH_SIZE = 5;

export default function InboxView() {
  const [selectedMessageId, setSelectedMessageId] = useState<SupportRequest["id"] | null>(null);
  const [analysisByMessageId, setAnalysisByMessageId] = useState<
    Partial<Record<SupportRequest["id"], RevenueRiskAnalysis>>
  >({});

  const {
    supportRequests,
    isLoading: isLoadingSupportRequests,
    error: supportRequestsError,
  } = useSupportRequests();

  const { analyzeSupportRequests, isAnalyzing, error: analysisError } = useAnalyzeSupportRequests();

  const unanalyzedSupportRequests = supportRequests.filter(
    (request) => !analysisByMessageId[request.id]
  );

  const analysisBatch = unanalyzedSupportRequests.slice(0, ANALYSIS_BATCH_SIZE);

  const analyzedCount = supportRequests.length - unanalyzedSupportRequests.length;

  const handleAnalyzeMessages = async () => {
    if (analysisBatch.length === 0) {
      return;
    }

    const analysesByMessageId = await analyzeSupportRequests(analysisBatch);

    if (!analysesByMessageId) {
      return;
    }

    setAnalysisByMessageId((current) => ({
      ...current,
      ...analysesByMessageId,
    }));
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

  const selectedMessage = supportRequests.find((message) => message.id === selectedMessageId);

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
        analyzedCount={analyzedCount}
        currentBatchSize={analysisBatch.length}
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
