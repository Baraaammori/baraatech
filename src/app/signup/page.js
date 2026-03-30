import SignupForm from "@/components/auth/signup-form";
import { getServerLanguage } from "@/lib/i18n";

export const metadata = {
  title: "Sign Up | Baraa Tech",
  description: "Create your Baraa Tech account to access the dashboard.",
};

export default async function SignupPage() {
  const lang = await getServerLanguage();

  return (
    <main className="flex-1 flex items-center justify-center py-24 px-6">
      
      <div className="fixed top-0 right-[30%] w-[400px] h-[400px] rounded-full bg-[var(--magenta)] opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-[30%] w-[300px] h-[300px] rounded-full bg-[var(--cyan)] opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md anim-float-up">
        <div className="glass p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--magenta)]/20 text-[var(--magenta)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </div>
            </div>
            <h1 className="font-[var(--font-display)] text-2xl font-bold text-white">
              {lang === "ar" ? "إنشاء حساب" : "Create Account"}
            </h1>
            <p className="text-[var(--gray-400)] mt-2">
              {lang === "ar"
                ? "أنشئ حسابك للوصول إلى جميع الميزات"
                : "Sign up to access all features"}
            </p>
          </div>

          <SignupForm lang={lang} />

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--gray-500)]">
              {lang === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
              <a href="/login" className="text-[var(--magenta)] hover:underline font-medium">
                {lang === "ar" ? "تسجيل الدخول" : "Sign in"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
