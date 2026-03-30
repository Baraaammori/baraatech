"use client";

import { useState } from "react";

export default function ProjectInterestForm({ projectId, projectSlug }) {
  const [status, setStatus] = useState("idle");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      projectId,
      projectSlug,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      notes: String(formData.get("notes") || ""),
    };

    const response = await fetch("/api/project-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 border-y border-[rgba(4,217,196,0.22)] py-4">
      <h3 className="font-[var(--font-display)] text-lg font-semibold text-[#e9fff5]">Interested in this build?</h3>
      <input name="name" required placeholder="Name" className="tech-input w-full rounded px-3 py-2" />
      <input name="email" type="email" required placeholder="Email" className="tech-input w-full rounded px-3 py-2" />
      <input name="phone" placeholder="Phone" className="tech-input w-full rounded px-3 py-2" />
      <textarea name="notes" placeholder="Notes" className="tech-input min-h-24 w-full rounded px-3 py-2" />
      <button type="submit" className="tech-button rounded px-4 py-2" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Submit"}
      </button>
      {status === "success" ? <p className="text-sm text-emerald-300">Request submitted.</p> : null}
      {status === "error" ? <p className="text-sm text-red-300">Failed to submit request.</p> : null}
    </form>
  );
}
