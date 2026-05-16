
'use client';

import { useState } from "react";
import { SupportMessage, supportMessages } from "../../lib/sample-data/messages";
import { MessageDetailsPanel } from "./MessageDetailsPanel";
export default function InboxTable () {
  const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(null);

  const onClosePanel = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="p-4">
      {selectedMessage && (
        <MessageDetailsPanel message={selectedMessage} onClose={onClosePanel} />
      )}
      <table className="min-w-full border border-slate-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-slate-200 px-4 py-2 text-left">Customer</th>
            <th className="border border-slate-200 px-4 py-2 text-left">Company</th>
            <th className="border border-slate-200 px-4 py-2 text-left">Subject</th>
            <th className="border border-slate-200 px-4 py-2 text-left">Urgency</th>
            <th className="border border-slate-200 px-4 py-2 text-left">Status</th>
            <th className="border border-slate-200 px-4 py-2 text-left">Received At</th>
          </tr>
        </thead>
        <tbody>
          {supportMessages.map((message) => (
            <tr key={message.id} className="hover:bg-gray-50" onClick={() => setSelectedMessage(message)}>
              <td className="border border-slate-200 px-4 py-2">{message.customerName}</td>
              <td className="border border-slate-200 px-4 py-2">{message.companyName}</td>
              <td className="border border-slate-200 px-4 py-2">{message.subject}</td>
              <td className="border border-slate-200 px-4 py-2">High</td>
              <td className="border border-slate-200 px-4 py-2">Open</td>
              <td className="border border-slate-200 px-4 py-2">{new Date(message.receivedAt).toLocaleString()}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}