import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { getCurrentUser, getCurrentUserPermissions } from "@/lib/auth/rbac";
import LanguageSwitcher from "@/components/public/language-switcher";
import MobileMenu from "@/components/public/mobile-menu";
import { getServerLanguage } from "@/lib/i18n";

const links = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/about", en: "About", ar: "من نحن" },
  { href: "/services", en: "Services", ar: "الخدمات" },
  { href: "/projects", en: "Builds", ar: "التجميعات" },
  { href: "/blog", en: "Blog", ar: "المدونة" },
  { href: "/news", en: "News", ar: "الأخبار" },
  { href: "/contact", en: "Contact", ar: "تواصل" },
];

export default async function SiteHeader() {
  noStore();

  const lang = await getServerLanguage();
  const user = await getCurrentUser();
  const permissionSet = await getCurrentUserPermissions();
  const canAccessDashboard = permissionSet.size > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent opacity-30" />

      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" />

      <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 lg:px-12 py-5">
        
        <Link href="/" className="group flex items-center gap-4">
          <div className="relative flex items-center justify-center w-10 h-10">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--magenta)] opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="relative font-[var(--font-display)] text-lg font-black text-black">B</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-[var(--font-display)] text-xl font-black tracking-tight text-white group-hover:text-[var(--cyan)] transition-colors">
              BARAA
            </span>
            <span className="font-[var(--font-code)] text-[10px] text-[var(--gray-600)] ml-2 tracking-widest">
              .TECH
            </span>
          </div>
        </Link>

        
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-[var(--font-code)] text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--gray-400)] transition-colors hover:text-white"
            >
              {lang === "ar" ? item.ar : item.en}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--cyan)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {user ? (
            <a
              href="/logout"
              className="font-[var(--font-code)] text-[11px] tracking-widest uppercase text-[var(--gray-600)] hover:text-[var(--magenta)] transition-colors"
            >
              {lang === "ar" ? "خروج" : "Logout"}
            </a>
          ) : (
            <Link
              href="/login"
              className="font-[var(--font-code)] text-[11px] tracking-widest uppercase text-[var(--gray-400)] hover:text-white transition-colors"
            >
              {lang === "ar" ? "دخول" : "Login"}
            </Link>
          )}

          {user && canAccessDashboard && (
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[var(--cyan)] to-[var(--lime)] rounded-full font-[var(--font-display)] text-[10px] font-bold tracking-widest uppercase text-black hover:shadow-[0_0_30px_var(--cyan)] transition-shadow"
            >
              {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
            </Link>
          )}

          <MobileMenu
            links={links}
            lang={lang}
            user={Boolean(user)}
            canAccessDashboard={canAccessDashboard}
          />
        </div>
      </div>
    </header>
  );
}
