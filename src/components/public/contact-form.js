"use client";

import { useState } from "react";

export default function ContactForm({ lang = "en" }) {
  const [status, setStatus] = useState("idle");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    const response = await fetch("/api/contact", {
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

  const isArabic = lang === "ar";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="mono-xs block mb-3">
          {isArabic ? "الاسم" : "NAME"}
        </label>
        <input
          name="name"
          required
          placeholder={isArabic ? "أدخل اسمك" : "Enter your name"}
          className="input-void"
        />
      </div>

      <div>
        <label className="mono-xs block mb-3">
          {isArabic ? "البريد الإلكتروني" : "EMAIL"}
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email"}
          className="input-void"
        />
      </div>

      <div>
        <label className="mono-xs block mb-3">
          {isArabic ? "الموضوع" : "SUBJECT"}
        </label>
        <input
          name="subject"
          required
          placeholder={isArabic ? "موضوع الرسالة" : "Message subject"}
          className="input-void"
        />
      </div>

      <div>
        <label className="mono-xs block mb-3">
          {isArabic ? "الرسالة" : "MESSAGE"}
        </label>
        <textarea
          name="message"
          required
          placeholder={isArabic ? "اكتب رسالتك هنا..." : "Write your message here..."}
          className="textarea-void"
          rows={5}
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            {isArabic ? "جاري الإرسال..." : "SENDING..."}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            {isArabic ? "إرسال الرسالة" : "SEND MESSAGE"}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </span>
        )}
      </button>

      {status === "success" && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--lime)]/10 border border-[var(--lime)]/30">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lime)]/20 text-[var(--lime)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <p className="text-[var(--lime)] font-medium">
            {isArabic ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!"}
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--magenta)]/10 border border-[var(--magenta)]/30">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--magenta)]/20 text-[var(--magenta)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </span>
          <p className="text-[var(--magenta)] font-medium">
            {isArabic ? "فشل إرسال الرسالة. حاول مرة أخرى." : "Failed to send. Please try again."}
          </p>
        </div>
      )}
    </form>
  );
}
