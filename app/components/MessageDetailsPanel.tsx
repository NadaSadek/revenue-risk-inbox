import { SupportMessage } from "../../lib/sample-data/messages";

export function MessageDetailsPanel({
  message,
  onClose,
}: {
  message: SupportMessage;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="absolute right-4 top-4 rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400">
          ✕
        </button>

        <div className="h-full overflow-y-auto p-6 pt-14">
          <p className="text-sm mb-4">
            From: {message.customerName} at {message.companyName}
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Received: {new Date(message.receivedAt).toLocaleString()}
          </p>
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">{message.subject}</h2>
            <p>{message.body}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
