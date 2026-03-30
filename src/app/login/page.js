import LoginForm from "@/components/auth/login-form";
import { getServerLanguage } from "@/lib/i18n";

export const metadata = {
  title: "Login | Baraa Tech",
  description: "Sign in to access the Baraa Tech dashboard.",
};

export default async function LoginPage() {
  const lang = await getServerLanguage();

  return (
    <main className="flex-1 flex items-center justify-center py-24 px-6">
      
      <div className="fixed top-0 left-[30%] w-[400px] h-[400px] rounded-full bg-[var(--cyan)] opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-[30%] w-[300px] h-[300px] rounded-full bg-[var(--magenta)] opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md anim-float-up">
        <div className="glass p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--cyan)]/20 text-[var(--cyan)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            </div>
            <h1 className="font-[var(--font-display)] text-2xl font-bold text-white">
              {lang === "ar" ? "تسجيل الدخول" : "Welcome Back"}
            </h1>
            <p className="text-[var(--gray-400)] mt-2">
              {lang === "ar"
                ? "أدخل بياناتك للوصول إلى لوحة التحكم"
                : "Enter your credentials to access the dashboard"}
            </p>
          </div>

          <LoginForm lang={lang} />

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--gray-500)]">
              {lang === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
              <a href="/signup" className="text-[var(--cyan)] hover:underline font-medium">
                {lang === "ar" ? "سجل الآن" : "Sign up"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
