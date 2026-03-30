import Link from "next/link";
import { getServerLanguage } from "@/lib/i18n";

const footerLinks = {
  explore: [
    { href: "/projects", en: "Builds", ar: "التجميعات" },
    { href: "/blog", en: "Blog", ar: "المدونة" },
    { href: "/news", en: "News", ar: "الأخبار" },
    { href: "/services", en: "Services", ar: "الخدمات" },
  ],
  company: [
    { href: "/about", en: "About", ar: "من نحن" },
    { href: "/contact", en: "Contact", ar: "تواصل" },
  ],
};

export default async function SiteFooter() {
  const lang = await getServerLanguage();

  return (
    <footer className="relative border-t border-white/5 bg-black">
      
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--magenta)] to-transparent opacity-50" />

      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-20">
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--magenta)]">
                <span className="font-[var(--font-display)] text-xl font-black text-black">B</span>
              </div>
              <div>
                <span className="font-[var(--font-display)] text-2xl font-black tracking-tight text-white">
                  BARAA
                </span>
                <span className="font-[var(--font-code)] text-xs text-[var(--gray-600)] ml-1">.TECH</span>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-[var(--gray-400)] leading-relaxed">
              {lang === "ar"
                ? "منصة ذكاء الأداء. نحلل العتاد. نبني الأنظمة. نحقق الأرقام."
                : "Performance intelligence platform. We analyze hardware. Build systems. Deliver results."}
            </p>

            
            <div className="mt-8 flex gap-3">
              {[
                { label: "X", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "YT", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                { label: "GH", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-[var(--gray-600)] transition-all hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                  aria-label={social.label}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          
          <div>
            <h3 className="mono-xs mb-6">{lang === "ar" ? "استكشف" : "EXPLORE"}</h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--gray-400)] transition-colors hover:text-white"
                  >
                    {lang === "ar" ? link.ar : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="mono-xs magenta mb-6">{lang === "ar" ? "الشركة" : "COMPANY"}</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--gray-400)] transition-colors hover:text-white"
                  >
                    {lang === "ar" ? link.ar : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="mono-xs lime mb-6">{lang === "ar" ? "الحالة" : "STATUS"}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--lime)] animate-pulse shadow-[0_0_10px_var(--lime)]" />
                <span className="text-[var(--gray-400)]">
                  {lang === "ar" ? "جميع الأنظمة تعمل" : "All systems online"}
                </span>
              </div>
              <p className="font-[var(--font-code)] text-xs text-[var(--gray-600)]">
                v2.0.0
              </p>
            </div>
          </div>
        </div>

        
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-[var(--font-code)] text-xs text-[var(--gray-600)]">
            {lang === "ar"
              ? `© ${new Date().getFullYear()} براء تك`
              : `© ${new Date().getFullYear()} BARAA TECH`}
          </p>
          <div className="flex items-center gap-2 font-[var(--font-code)] text-xs text-[var(--gray-600)]">
            <span className="text-[var(--cyan)]">&gt;</span>
            <span>SYSTEM.STATUS:</span>
            <span className="text-[var(--lime)]">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
