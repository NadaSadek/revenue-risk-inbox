export default function InboxToolbar({
  isAnalyzing,
  supportRequestsCount,
  analyzedCount,
  analysisError,
  batchSize,
  onAnalyze,
}: {
  isAnalyzing: boolean;
  supportRequestsCount: number;
  analyzedCount: number;
  batchSize: number;
  analysisError: string | null;
  onAnalyze: () => Promise<void>;
}) {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <button
          type="button"
          disabled={isAnalyzing || supportRequestsCount === 0}
          onClick={onAnalyze}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          {isAnalyzing ? "Analyzing…" : `Analyze ${batchSize} messages`}
        </button>
      </div>

      <div className="text-sm text-slate-600" aria-live="polite">
        {isAnalyzing && (
          <span>
            Running AI analysis for the current batch of {batchSize} messages. This may take a
            moment.
          </span>
        )}
        {!isAnalyzing && analysisError && <span className="text-red-700">{analysisError}</span>}
        {!isAnalyzing && !analysisError && supportRequestsCount > 0 && (
          <span>
            {analyzedCount} of {supportRequestsCount} support messages analyzed.
          </span>
        )}
      </div>
    </div>
  );
}
