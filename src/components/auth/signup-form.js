"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupForm({ lang = "en" }) {
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isArabic = lang === "ar";

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(
      isArabic
        ? "تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد التسجيل، ثم سجل الدخول."
        : "Account created. Check your email to confirm signup, then log in."
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="fullName" className="mono-xs block mb-3">
          {isArabic ? "الاسم الكامل" : "FULL NAME"}
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
          className="input-void"
        />
      </div>

      <div>
        <label htmlFor="email" className="mono-xs block mb-3">
          {isArabic ? "البريد الإلكتروني" : "EMAIL"}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email"}
          className="input-void"
        />
      </div>

      <div>
        <label htmlFor="password" className="mono-xs block mb-3">
          {isArabic ? "كلمة المرور" : "PASSWORD"}
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={isArabic ? "أدخل كلمة المرور (8 أحرف على الأقل)" : "Enter password (min 8 characters)"}
          className="input-void"
        />
      </div>

      {error && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--magenta)]/10 border border-[var(--magenta)]/30">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--magenta)]/20 text-[var(--magenta)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </span>
          <p className="text-[var(--magenta)] font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--lime)]/10 border border-[var(--lime)]/30">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lime)]/20 text-[var(--lime)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <p className="text-[var(--lime)] font-medium">{success}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            {isArabic ? "جاري الإنشاء..." : "Creating account..."}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {isArabic ? "إنشاء الحساب" : "Create Account"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
}
