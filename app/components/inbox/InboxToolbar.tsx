type InboxToolbarProps = {
  isAnalyzing: boolean;
  supportRequestsCount: number;
  analyzedCount: number;
  currentBatchSize: number;
  analysisError: string | null;
  onAnalyze: () => Promise<void>;
};

export default function InboxToolbar({
  isAnalyzing,
  supportRequestsCount,
  analyzedCount,
  analysisError,
  currentBatchSize,
  onAnalyze,
}: InboxToolbarProps) {
  const remainingCount = supportRequestsCount - analyzedCount;
  const hasRemainingMessages = remainingCount > 0;

  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        disabled={isAnalyzing || supportRequestsCount === 0 || !hasRemainingMessages}
        onClick={onAnalyze}
        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        {isAnalyzing ? "Analyzing…" : `Analyze ${currentBatchSize} messages`}
      </button>

      <div className="text-sm text-slate-600" aria-live="polite">
        {isAnalyzing && <span>Analyzing {currentBatchSize} messages. This may take a moment.</span>}
        {!isAnalyzing && analysisError && <span className="text-red-700">{analysisError}</span>}
        {!isAnalyzing &&
          !analysisError &&
          supportRequestsCount > 0 &&
          (hasRemainingMessages ? (
            <span>
              {analyzedCount} of {supportRequestsCount} messages analyzed.
            </span>
          ) : (
            <span>All messages analyzed.</span>
          ))}
      </div>
    </div>
  );
}
