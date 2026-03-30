"use client";

import { useMemo, useState } from "react";
import PaginationControls from "@/components/dashboard/pagination-controls";

const PAGE_SIZE = 12;

export default function SettingsManager({ initialItems }) {
  const [items, setItems] = useState(initialItems ?? []);
  const [settingKey, setSettingKey] = useState("");
  const [settingValue, setSettingValue] = useState("{}");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paginatedItems = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    return items.slice(from, from + PAGE_SIZE);
  }, [items, page]);

  async function saveSetting(event) {
    event.preventDefault();
    let parsedValue;

    try {
      parsedValue = JSON.parse(settingValue);
    } catch {
      alert("Invalid JSON. Please check value format.");
      return;
    }

    setSaving(true);
    const response = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ setting_key: settingKey, setting_value: parsedValue }),
    });
    setSaving(false);

    if (!response.ok) return;
    window.location.reload();
  }

  return (
    <section>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="mono-xs mb-2">CONFIGURATION</p>
          <h1 className="font-[var(--font-display)] text-3xl font-bold text-white">Settings</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="dash-btn dash-btn-primary"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {showForm ? "Cancel" : "Add Setting"}
        </button>
      </div>

      
      {showForm && (
        <div className="dash-card mb-8">
          <div className="dash-card-header">
            <h2 className="dash-card-title">New Setting</h2>
          </div>
          <form onSubmit={saveSetting} className="dash-form">
            <div>
              <label className="mono-xs block mb-2">SETTING KEY</label>
              <input
                placeholder="e.g., site_config"
                value={settingKey}
                onChange={(event) => setSettingKey(event.target.value)}
                className="dash-input"
                required
              />
            </div>
            <div>
              <label className="mono-xs block mb-2">JSON VALUE</label>
              <textarea
                placeholder='{"siteName":"Baraa Tech"}'
                value={settingValue}
                onChange={(event) => setSettingValue(event.target.value)}
                className="dash-input min-h-[160px] font-[var(--font-code)] text-sm"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="dash-btn dash-btn-ghost"
              >
                Cancel
              </button>
              <button className="dash-btn dash-btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save Setting"}
              </button>
            </div>
          </form>
        </div>
      )}

      
      <div className="dash-card">
        {items.length > 0 ? (
          <div className="divide-y divide-white/5">
            {paginatedItems.map((item) => (
              <div key={item.id} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[var(--font-code)] text-[var(--cyan)] font-medium">
                    {item.setting_key}
                  </h3>
                  <span className="dash-badge dash-badge-cyan">Active</span>
                </div>
                <pre className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-xs font-[var(--font-code)] text-[var(--gray-100)] overflow-auto">
                  {JSON.stringify(item.setting_value, null, 2)}
                </pre>
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
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <p className="dash-empty-title">No settings configured</p>
            <p className="dash-empty-desc">
              Add configuration settings to customize your platform.
            </p>
          </div>
        )}
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={items.length}
          pageSize={PAGE_SIZE}
          itemLabel="settings"
        />
      </div>
    </section>
  );
}
