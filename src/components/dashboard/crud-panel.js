"use client";

import { useMemo, useState } from "react";
import PaginationControls from "@/components/dashboard/pagination-controls";

const PAGE_SIZE = 12;

export default function CrudPanel({ title, endpoint, initialItems, fields, editable = true }) {
  const [items, setItems] = useState(initialItems ?? []);
  const [form, setForm] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""]))
  );
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paginatedItems = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    return items.slice(from, from + PAGE_SIZE);
  }, [items, page]);

  async function createItem(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!response.ok) return;
    window.location.reload();
  }

  async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const response = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
    if (!response.ok) return;
    setItems((old) => {
      const nextItems = old.filter((item) => item.id !== id);
      const nextTotalPages = Math.max(1, Math.ceil(nextItems.length / PAGE_SIZE));
      setPage((currentPage) => Math.min(currentPage, nextTotalPages));
      return nextItems;
    });
  }

  async function togglePublished(item) {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, published: !item.published }),
    });
    if (!response.ok) return;
    setItems((old) =>
      old.map((current) =>
        current.id === item.id ? { ...current, published: !current.published } : current
      )
    );
  }

  async function quickEdit(item) {
    if (!editable) return;
    const titleValue = prompt("New title", item.title_en ?? "");
    if (titleValue === null) return;

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, title_en: titleValue }),
    });

    if (!response.ok) return;
    setItems((old) =>
      old.map((current) =>
        current.id === item.id ? { ...current, title_en: titleValue } : current
      )
    );
  }

  return (
    <section>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="mono-xs mb-2">MANAGE</p>
          <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">{title}</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="dash-btn dash-btn-primary self-start sm:self-auto"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {showForm ? "Cancel" : "Create New"}
        </button>
      </div>

      
      {showForm && (
        <div className="dash-card mb-8">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Create New {title.slice(0, -1)}</h2>
          </div>
          <form onSubmit={createItem} className="dash-form">
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <label className="mono-xs block mb-2">{field.label.toUpperCase()}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      placeholder={field.label}
                      required={field.required}
                      value={form[field.name] ?? ""}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.name]: event.target.value,
                        }))
                      }
                      className="dash-input min-h-[120px] resize-y"
                      rows={4}
                    />
                  ) : (
                    <input
                      placeholder={field.label}
                      required={field.required}
                      type={field.type ?? "text"}
                      value={form[field.name] ?? ""}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.name]: event.target.value,
                        }))
                      }
                      className="dash-input"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="dash-btn dash-btn-ghost"
              >
                Cancel
              </button>
              <button className="dash-btn dash-btn-primary" disabled={loading} type="submit">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      
      <div className="dash-card">
        {items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="font-medium text-white">{item.title_en || item.slug}</span>
                    </td>
                    <td>
                      <span className="font-[var(--font-code)] text-xs text-[var(--gray-400)]">
                        {item.slug}
                      </span>
                    </td>
                    <td>
                      {typeof item.published === "boolean" ? (
                        <span
                          className={`dash-badge ${
                            item.published ? "dash-badge-lime" : "dash-badge-magenta"
                          }`}
                        >
                          {item.published ? "Published" : "Draft"}
                        </span>
                      ) : (
                        <span className="dash-badge dash-badge-cyan">Active</span>
                      )}
                    </td>
                    <td>
                      <span className="text-[var(--gray-400)] text-sm">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : "—"}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        {typeof item.published === "boolean" && (
                          <button
                            className={`dash-btn ${
                              item.published ? "dash-btn-ghost" : "dash-btn-success"
                            }`}
                            onClick={() => togglePublished(item)}
                            type="button"
                          >
                            {item.published ? "Unpublish" : "Publish"}
                          </button>
                        )}
                        {editable && (
                          <button
                            className="dash-btn dash-btn-secondary"
                            onClick={() => quickEdit(item)}
                            type="button"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="dash-btn dash-btn-danger"
                          onClick={() => deleteItem(item.id)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
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
              itemLabel={title.toLowerCase()}
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
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <p className="dash-empty-title">No {title.toLowerCase()} yet</p>
            <p className="dash-empty-desc">
              Get started by creating your first {title.toLowerCase().slice(0, -1)}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
