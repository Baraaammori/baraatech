import Image from "next/image";
import { getPageContent } from "@/lib/cms/public";
import { getServerLanguage, pickLocalized } from "@/lib/i18n";

export const metadata = {
  title: "About | Baraa Tech",
  description: "Learn about our mission to deliver performance-first hardware solutions for creators and gamers.",
};

export default async function AboutPage() {
  const lang = await getServerLanguage();
  const content = await getPageContent("about");

  const values = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      en: "Performance First",
      ar: "الأداء أولاً",
      descEn: "Every component is selected and tested for maximum real-world performance.",
      descAr: "كل مكون يتم اختياره واختباره لتحقيق أقصى أداء في الاستخدام الفعلي.",
      color: "cyan",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      en: "Future-Ready",
      ar: "جاهز للمستقبل",
      descEn: "Built with upgradability and longevity in mind for years of service.",
      descAr: "مصمم مع مراعاة قابلية الترقية والاستدامة لسنوات من الخدمة.",
      color: "magenta",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      en: "Data-Driven",
      ar: "قائم على البيانات",
      descEn: "Benchmark-backed recommendations with real performance metrics.",
      descAr: "توصيات مدعومة بالاختبارات مع مقاييس أداء حقيقية.",
      color: "lime",
    },
  ];

  return (
    <main className="flex-1">
      
      <section className="relative py-20 lg:py-32 overflow-hidden">
        
        <div className="absolute top-0 right-[20%] w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] rounded-full bg-[var(--magenta)] opacity-[0.05] blur-[150px]" />

        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div className="anim-up">
              <p className="mono-xs magenta mb-4 lg:mb-6">              </p>
              <h1 className="title-xl">
                {pickLocalized(
                  lang,
                  content?.title_en,
                  content?.title_ar,
                  lang === "ar" ? "است��ديو ذكاء" : "Hardware"
                )}
                <br />
                <span className="text-[var(--magenta)]">
                  {lang === "ar" ? "العتاد" : "Intelligence"}
                </span>
              </h1>
              <p className="body-xl mt-6 lg:mt-8 max-w-lg">
                {pickLocalized(
                  lang,
                  content?.content_en?.intro,
                  content?.content_ar?.intro,
                  lang === "ar"
                    ? "نحن فريق من المهندسين والمحللين المتخصصين في بناء أنظمة عالية الأداء واختبار العتاد."
                    : "A team of engineers and analysts specializing in high-performance builds and hardware testing."
                )}
              </p>
            </div>

            <div className="relative anim-up delay-2">
              <div className="card-neon">
                <div className="card-neon-inner p-0 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"
                    alt="Technical workspace with monitors"
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
              </div>

              
              <div className="absolute -bottom-6 -left-4 lg:-bottom-8 lg:-left-8 card-glass px-6 py-4 lg:px-8 lg:py-6 anim-up delay-4">
                <p className="font-[var(--font-display)] text-3xl lg:text-4xl font-black text-[var(--cyan)]">2018</p>
                <p className="mono-xs mt-1 lg:mt-2 text-[10px] lg:text-[11px]">{lang === "ar" ? "سنة التأسيس" : "FOUNDED"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="relative py-20 lg:py-32 border-t border-white/5">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center anim-up">
            <p className="mono-xs mb-4 lg:mb-6">{lang === "ar" ? "مهمتنا" : "OUR MISSION"}</p>
            <h2 className="title-lg">
              {lang === "ar"
                ? "تمكين المبدعين واللاعبين من أدوات"
                : "Empowering Creators and Gamers with"}
              <br />
              <span className="text-[var(--cyan)]">
                {lang === "ar" ? "الأداء المثالية" : "Optimal Performance"}
              </span>
            </h2>
            <p className="body-lg mt-6 lg:mt-8">
              {lang === "ar"
                ? "نؤمن بأن كل شخص يستحق نظاماً يعمل بأقصى كفاءة. نحن هنا لجسر الفجوة بين المواصفات التقنية المعقدة والأداء الفعلي الذي تحتاجه."
                : "We believe everyone deserves a system that performs at its peak. We're here to bridge the gap between complex technical specs and the real-world performance you need."}
            </p>
          </div>
        </div>
      </section>

      
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="text-center mb-12 lg:mb-20">
            <p className="mono-xs lime mb-4 lg:mb-6">{lang === "ar" ? "قيمنا" : "OUR VALUES"}</p>
            <h2 className="title-lg">
              {lang === "ar" ? "ما يميزنا" : "What Sets Us Apart"}
            </h2>
          </div>

          <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className={`card-glass p-6 lg:p-10 anim-up delay-${index + 1} group hover:border-[var(--${value.color})] transition-all`}
              >
                <div
                  className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-xl lg:rounded-2xl mb-6 lg:mb-8 transition-all"
                  style={{
                    background: `rgba(var(--${value.color === "cyan" ? "0, 229, 255" : value.color === "magenta" ? "255, 0, 128" : "0, 255, 106"}), 0.1)`,
                    border: `1px solid rgba(var(--${value.color === "cyan" ? "0, 229, 255" : value.color === "magenta" ? "255, 0, 128" : "0, 255, 106"}), 0.3)`,
                    color: `var(--${value.color})`,
                  }}
                >
                  {value.icon}
                </div>
                <h3 className="font-[var(--font-display)] text-lg lg:text-2xl font-bold text-white group-hover:text-[var(--cyan)] transition-colors">
                  {lang === "ar" ? value.ar : value.en}
                </h3>
                <p className="body-md mt-3 lg:mt-4">
                  {lang === "ar" ? value.descAr : value.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="relative py-20 lg:py-32 border-t border-white/5">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="card-glass p-8 lg:p-12 xl:p-16 anim-scale">
            <div className="grid gap-8 lg:gap-12 grid-cols-2 lg:grid-cols-4 text-center">
              {[
                { value: "150+", labelEn: "Builds Completed", labelAr: "تجميعة منجزة", color: "var(--cyan)" },
                { value: "6+", labelEn: "Years Experience", labelAr: "سنوات خبرة", color: "var(--magenta)" },
                { value: "4K+", labelEn: "Benchmarks Run", labelAr: "اختبار أداء", color: "var(--lime)" },
                { value: "99%", labelEn: "Client Satisfaction", labelAr: "رضا العملاء", color: "var(--purple)" },
              ].map((stat, i) => (
                <div key={i} className={`anim-up delay-${i + 1}`}>
                  <p
                    className="font-[var(--font-display)] text-4xl lg:text-5xl xl:text-6xl font-black"
                    style={{ color: stat.color, textShadow: `0 0 60px ${stat.color}40` }}
                  >
                    {stat.value}
                  </p>
                  <p className="mono-xs mt-3 lg:mt-4 text-[10px] lg:text-[11px]" style={{ color: stat.color }}>
                    {lang === "ar" ? stat.labelAr : stat.labelEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative anim-up order-2 lg:order-1">
              <div className="card-solid overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
                  alt="Gaming setup with RGB lighting"
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            </div>

            <div className="anim-up delay-2 order-1 lg:order-2">
              <p className="mono-xs purple mb-4 lg:mb-6">{lang === "ar" ? "منهجيتنا" : "OUR APPROACH"}</p>
              <h2 className="title-lg">
                {lang === "ar" ? "علم يلتقي" : "Science Meets"}
                <br />
                <span className="text-[var(--purple)]">{lang === "ar" ? "بالإبداع" : "Craft"}</span>
              </h2>
              <p className="body-lg mt-6 lg:mt-8">
                {lang === "ar"
                  ? "نجمع بين التحليل الدقيق للبيانات والخبرة العملية في بناء الأنظمة. كل توصية نقدمها مدعومة باختبارات حقيقية."
                  : "We combine rigorous data analysis with hands-on system building expertise. Every recommendation is backed by real testing."}
              </p>

              <ul className="mt-8 lg:mt-10 space-y-4 lg:space-y-5">
                {[
                  { en: "Component compatibility verification", ar: "التحقق من توافق المكونات" },
                  { en: "Thermal and acoustic optimization", ar: "تحسين الحرارة والصوت" },
                  { en: "Real-world workload testing", ar: "اختبار أعباء العمل الحقيقية" },
                  { en: "Long-term reliability monitoring", ar: "مراقبة الموثوقية طويلة المدى" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 lg:gap-4">
                    <span className="flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-lg bg-[var(--lime)]/10 text-[var(--lime)] flex-shrink-0">
                      <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[var(--gray-100)] text-sm lg:text-base">
                      {lang === "ar" ? item.ar : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
