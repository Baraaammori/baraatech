"use client";

import { useMemo, useState } from "react";
import PaginationControls from "@/components/dashboard/pagination-controls";

const PAGE_SIZE = 15;

export default function MessagesManager({ initialItems }) {
  const [items, setItems] = useState(initialItems ?? []);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paginatedItems = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    return items.slice(from, from + PAGE_SIZE);
  }, [items, page]);

  async function toggleRead(item) {
    const response = await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, is_read: !item.is_read }),
    });

    if (!response.ok) return;
    setItems((old) =>
      old.map((current) =>
        current.id === item.id ? { ...current, is_read: !current.is_read } : current
      )
    );
  }

  async function deleteMessage(id) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const response = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    if (!response.ok) return;
    setItems((old) => {
      const nextItems = old.filter((item) => item.id !== id);
      const nextTotalPages = Math.max(1, Math.ceil(nextItems.length / PAGE_SIZE));
      setPage((currentPage) => Math.min(currentPage, nextTotalPages));
      return nextItems;
    });
    if (selectedMessage?.id === id) setSelectedMessage(null);
  }

  return (
    <section>
      
      <div className="mb-8">
        <p className="mono-xs mb-2">INBOX</p>
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-white">
          Contact Messages
        </h1>
        <p className="text-[var(--gray-400)] mt-2">
          View and manage incoming contact form submissions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        
        <div className="dash-card">
          {items.length > 0 ? (
            <div className="divide-y divide-white/5">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMessage(item)}
                  className={`p-4 cursor-pointer transition-all hover:bg-white/[0.02] ${
                    selectedMessage?.id === item.id ? "bg-[var(--cyan)]/5 border-l-2 border-[var(--cyan)]" : ""
                  } ${!item.is_read ? "bg-[var(--magenta)]/5" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!item.is_read && (
                          <span className="h-2 w-2 rounded-full bg-[var(--magenta)] animate-pulse" />
                        )}
                        <h3 className="font-medium text-white truncate">{item.subject}</h3>
                      </div>
                      <p className="text-sm text-[var(--gray-400)] truncate">
                        {item.name} &lt;{item.email}&gt;
                      </p>
                      <p className="text-xs text-[var(--gray-600)] mt-1 line-clamp-1">
                        {item.message}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--gray-600)] whitespace-nowrap">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="dash-empty">
              <svg
                className="dash-empty-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p className="dash-empty-title">No messages yet</p>
              <p className="dash-empty-desc">
                Messages from your contact form will appear here.
              </p>
            </div>
          )}
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={items.length}
            pageSize={PAGE_SIZE}
            itemLabel="messages"
          />
        </div>

        
        {selectedMessage ? (
          <div className="dash-card">
            <div className="dash-card-header">
              <h2 className="dash-card-title">Message Details</h2>
              <span
                className={`dash-badge ${
                  selectedMessage.is_read ? "dash-badge-cyan" : "dash-badge-magenta"
                }`}
              >
                {selectedMessage.is_read ? "Read" : "Unread"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mono-xs mb-1">FROM</p>
                <p className="text-white font-medium">{selectedMessage.name}</p>
                <p className="text-sm text-[var(--gray-400)]">{selectedMessage.email}</p>
              </div>

              <div>
                <p className="mono-xs mb-1">SUBJECT</p>
                <p className="text-white">{selectedMessage.subject}</p>
              </div>

              <div>
                <p className="mono-xs mb-1">MESSAGE</p>
                <p className="text-[var(--gray-100)] whitespace-pre-wrap bg-white/[0.02] rounded-xl p-4 text-sm">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => toggleRead(selectedMessage)}
                  className="dash-btn dash-btn-secondary flex-1"
                >
                  Mark as {selectedMessage.is_read ? "Unread" : "Read"}
                </button>
                <button
                  type="button"
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="dash-btn dash-btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="dash-card flex items-center justify-center min-h-[300px]">
            <div className="text-center text-[var(--gray-600)]">
              <svg
                className="w-12 h-12 mx-auto mb-3 opacity-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-sm">Select a message to view details</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
