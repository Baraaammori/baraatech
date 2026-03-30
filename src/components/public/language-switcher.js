"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function getCookieLang() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|; )site_lang=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeLang = useMemo(() => {
    const queryLang = searchParams.get("lang");
    if (queryLang === "en" || queryLang === "ar") return queryLang;
    const cookieLang = getCookieLang();
    return cookieLang === "ar" ? "ar" : "en";
  }, [searchParams]);

  function setLang(lang) {
    document.cookie = `site_lang=${encodeURIComponent(lang)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    router.refresh();
  }

  return (
    <div className="flex items-center" role="group" aria-label="Language selector">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 font-[var(--font-code)] text-[10px] font-bold tracking-widest transition-all duration-200 border-r border-white/10 ${
          activeLang === "en"
            ? "text-[var(--cyan)]"
            : "text-[var(--gray-600)] hover:text-white"
        }`}
        aria-pressed={activeLang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={`px-3 py-1.5 font-[var(--font-code)] text-[10px] font-bold tracking-widest transition-all duration-200 ${
          activeLang === "ar"
            ? "text-[var(--magenta)]"
            : "text-[var(--gray-600)] hover:text-white"
        }`}
        aria-pressed={activeLang === "ar"}
      >
        AR
      </button>
    </div>
  );
}
