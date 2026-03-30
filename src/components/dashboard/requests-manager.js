"use client";

import { useMemo, useState } from "react";
import PaginationControls from "@/components/dashboard/pagination-controls";

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "cyan" },
  { value: "reviewing", label: "Reviewing", color: "purple" },
  { value: "contacted", label: "Contacted", color: "lime" },
  { value: "closed", label: "Closed", color: "magenta" },
];

const PAGE_SIZE = 15;

export default function RequestsManager({ initialItems }) {
  const [items, setItems] = useState(initialItems ?? []);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paginatedItems = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    return items.slice(from, from + PAGE_SIZE);
  }, [items, page]);

  async function updateStatus(id, status) {
    const response = await fetch("/api/admin/project-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) return;
    setItems((old) => old.map((item) => (item.id === id ? { ...item, status } : item)));
    if (selectedRequest?.id === id) {
      setSelectedRequest((old) => ({ ...old, status }));
    }
  }

  function getStatusColor(status) {
    const option = STATUS_OPTIONS.find((o) => o.value === status);
    return option?.color || "cyan";
  }

  return (
    <section>
      
      <div className="mb-8">
        <p className="mono-xs mb-2">LEADS</p>
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-white">
          Project Requests
        </h1>
        <p className="text-[var(--gray-400)] mt-2">
          Track and manage incoming project interest requests.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        
        <div className="dash-card">
          {items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Contact</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedRequest(item)}
                      className={`cursor-pointer ${
                        selectedRequest?.id === item.id ? "bg-[var(--cyan)]/5" : ""
                      }`}
                    >
                      <td>
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-xs text-[var(--gray-400)]">{item.email}</p>
                        </div>
                      </td>
                      <td>
                        <span className="font-[var(--font-code)] text-sm text-[var(--cyan)]">
                          {item.project_slug}
                        </span>
                      </td>
                      <td>
                        <span className={`dash-badge dash-badge-${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <span className="text-[var(--gray-400)] text-sm">
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString()
                            : "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={items.length}
                pageSize={PAGE_SIZE}
                itemLabel="requests"
              />
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              <p className="dash-empty-title">No requests yet</p>
              <p className="dash-empty-desc">
                Project interest requests will appear here.
              </p>
            </div>
          )}
        </div>

        
        {selectedRequest ? (
          <div className="dash-card">
            <div className="dash-card-header">
              <h2 className="dash-card-title">Request Details</h2>
              <span className={`dash-badge dash-badge-${getStatusColor(selectedRequest.status)}`}>
                {selectedRequest.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mono-xs mb-1">CONTACT</p>
                <p className="text-white font-medium">{selectedRequest.name}</p>
                <p className="text-sm text-[var(--gray-400)]">{selectedRequest.email}</p>
              </div>

              <div>
                <p className="mono-xs mb-1">PROJECT</p>
                <p className="font-[var(--font-code)] text-[var(--cyan)]">
                  {selectedRequest.project_slug}
                </p>
              </div>

              {selectedRequest.message && (
                <div>
                  <p className="mono-xs mb-1">MESSAGE</p>
                  <p className="text-[var(--gray-100)] whitespace-pre-wrap bg-white/[0.02] rounded-xl p-4 text-sm">
                    {selectedRequest.message}
                  </p>
                </div>
              )}

              <div>
                <p className="mono-xs mb-2">UPDATE STATUS</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateStatus(selectedRequest.id, option.value)}
                      className={`dash-btn ${
                        selectedRequest.status === option.value
                          ? `dash-btn-${option.color === "cyan" ? "secondary" : option.color === "lime" ? "success" : option.color === "magenta" ? "danger" : "ghost"}`
                          : "dash-btn-ghost"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <p className="text-sm">Select a request to view details</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
