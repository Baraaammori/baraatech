"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileMenu({ links, lang, user, canAccessDashboard }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="lg:hidden p-2 text-white hover:text-[var(--cyan)] transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-site-menu"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          aria-label="Close menu overlay"
          onClick={closeMenu}
        />

        <div
          id="mobile-site-menu"
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[360px] border-l border-white/10 bg-[rgba(3,5,20,0.98)] p-6 pt-20 shadow-[0_0_60px_rgba(0,229,255,0.15)] transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl border border-white/10 px-4 py-3 font-[var(--font-code)] text-xs font-semibold tracking-[0.15em] uppercase text-white hover:border-[var(--cyan)]/60 hover:text-[var(--cyan)]"
              >
                {lang === "ar" ? item.ar : item.en}
              </Link>
            ))}

            {user && canAccessDashboard && (
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-center rounded-xl bg-gradient-to-r from-[var(--cyan)] to-[var(--lime)] px-4 py-3 font-[var(--font-display)] text-xs font-bold uppercase tracking-[0.16em] text-black"
              >
                {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
              </Link>
            )}

            {user ? (
              <a
                href="/logout"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center rounded-xl border border-[var(--magenta)]/60 px-4 py-3 font-[var(--font-code)] text-xs font-semibold uppercase tracking-[0.15em] text-[var(--magenta)]"
              >
                {lang === "ar" ? "خروج" : "Logout"}
              </a>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 font-[var(--font-code)] text-xs font-semibold uppercase tracking-[0.15em] text-white"
              >
                {lang === "ar" ? "دخول" : "Login"}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}