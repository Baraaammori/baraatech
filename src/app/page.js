import Link from "next/link";
import Image from "next/image";
import { getPageContent, listPublishedProjects } from "@/lib/cms/public";
import { getServerLanguage, pickLocalized } from "@/lib/i18n";

export default async function Home() {
  const lang = await getServerLanguage();
  const homeContent = await getPageContent("home");
  const projects = await listPublishedProjects();
  const featured = projects.slice(0, 3);

  return (
    <main className="flex-1">
      
      <section className="relative min-h-screen flex flex-col justify-center py-20 lg:py-0">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          
          <div className="anim-up">
            <p className="mono-xs mb-6">
              {lang === "ar" ? "[ مختبر_براء ]" : "[ BARAA_LAB ]"}
            </p>
            <h1 className="hero-mega" data-text={lang === "ar" ? "نبني" : "BUILD"}>
              {lang === "ar" ? "نبني" : "BUILD"}
            </h1>
            <h1 className="title-outline mt-2">
              {lang === "ar" ? "المستقبل" : "THE FUTURE"}
            </h1>
          </div>

          
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_400px] lg:items-end">
            
            <div className="anim-up delay-2">
              <p className="body-xl max-w-lg">
                {pickLocalized(
                  lang,
                  homeContent?.content_en?.intro,
                  homeContent?.content_ar?.intro,
                  lang === "ar"
                    ? "منصة ذكاء الأداء. نحلل العتاد. نبني الأنظمة. نحقق الأرقام."
                    : "Performance intelligence platform. We analyze hardware. Build systems. Deliver results."
                )}
              </p>

              <div className="mt-12 flex flex-wrap gap-5">
                <Link href="/projects" className="btn-primary">
                  {lang === "ar" ? "استكشف التجميعات" : "Explore Builds"}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn-secondary">
                  {lang === "ar" ? "تواصل معنا" : "Get in Touch"}
                </Link>
              </div>
            </div>

            
            <div className="anim-up delay-3 flex gap-6 sm:gap-8 lg:flex-col lg:items-end lg:text-right flex-wrap">
              {[
                { value: "150+", label: lang === "ar" ? "تجميعة" : "BUILDS", color: "var(--cyan)" },
                { value: "4K+", label: lang === "ar" ? "اختبار" : "BENCHMARKS", color: "var(--magenta)" },
                { value: "99%", label: lang === "ar" ? "رضا" : "SATISFACTION", color: "var(--lime)" },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <p
                    className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-7xl font-black transition-all group-hover:scale-105"
                    style={{ color: stat.color, textShadow: `0 0 60px ${stat.color}40` }}
                  >
                    {stat.value}
                  </p>
                  <p className="mono-xs mt-2" style={{ color: stat.color }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="lg:hidden mt-12 anim-up delay-3">
            <div className="card-neon">
              <div className="card-neon-inner p-0 overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=1200&q=80"
                    alt="High-end motherboard"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--lime)] animate-pulse shadow-[0_0_20px_var(--lime)]" />
                    <span className="mono-xs lime text-[10px]">SYSTEM ONLINE</span>
                  </div>
                  <span className="mono-xs text-[10px]">RTX 4090 • i9-14900K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[40%] max-w-[600px] anim-slide-left delay-4 pr-6 lg:pr-12">
          <div className="card-neon">
            <div className="card-neon-inner p-0 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=1200&q=80"
                  alt="High-end motherboard"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="scanlines absolute inset-0" />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[var(--lime)] animate-pulse shadow-[0_0_20px_var(--lime)]" />
                  <span className="mono-xs lime">SYSTEM ONLINE</span>
                </div>
                <span className="mono-xs">RTX 4090 • i9-14900K</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 anim-up delay-5">
          <div className="flex flex-col items-center gap-3">
            <span className="mono-xs">{lang === "ar" ? "اسحب للأسفل" : "SCROLL"}</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--cyan)] to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      
      <section className="relative py-32">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-2 gap-8 items-end mb-20">
            <div className="anim-up">
              <p className="mono-xs magenta mb-4">{lang === "ar" ? "المشاريع" : "PROJECTS"}</p>
              <h2 className="title-xl">
                {lang === "ar" ? "تجميعات" : "Featured"}
                <br />
                <span className="text-[var(--magenta)]">{lang === "ar" ? "مميزة" : "Builds"}</span>
              </h2>
            </div>
            <div className="anim-up delay-1 lg:text-right">
              <p className="body-lg max-w-md lg:ml-auto">
                {lang === "ar"
                  ? "أنظمة مصممة خصيصاً للاعبين والمبدعين والمحترفين."
                  : "Systems engineered for gamers, creators, and professionals."}
              </p>
              <Link href="/projects" className="btn-link mt-6">
                {lang === "ar" ? "عرض الكل" : "View All"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          
          {featured.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
              
              {featured[0] && (
                <div className="lg:col-span-2 lg:row-span-2 anim-up delay-2">
                  <Link href={`/projects/${featured[0].slug}`} className="group block h-full">
                    <div className="card-neon h-full">
                      <div className="card-neon-inner p-0 h-full flex flex-col">
                        <div className="relative aspect-[16/10] lg:flex-1 overflow-hidden rounded-t-[28px]">
                          <Image
                            src={featured[0].main_image_url || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80"}
                            alt={featured[0].title_en}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                          <div className="absolute top-6 left-6 flex gap-3">
                            <span className="tag tag-cyan">{featured[0].resolution_category || "4K"}</span>
                            <span className="tag tag-magenta">{featured[0].performance_category || "ULTRA"}</span>
                          </div>
                        </div>
                        <div className="p-8">
                          <h3 className="title-lg group-hover:text-[var(--cyan)] transition-colors">
                            {pickLocalized(lang, featured[0].title_en, featured[0].title_ar, featured[0].title_en)}
                          </h3>
                          <p className="body-md mt-4 line-clamp-2">
                            {pickLocalized(lang, featured[0].short_description_en, featured[0].short_description_ar, featured[0].short_description_en)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              
              {featured.slice(1).map((project, index) => (
                <div key={project.id} className={`anim-up delay-${index + 3}`}>
                  <Link href={`/projects/${project.slug}`} className="group block h-full">
                    <div className="card-solid h-full p-6 flex flex-col">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-6">
                        <Image
                          src={project.main_image_url || `https://images.unsplash.com/photo-151877355339${index}-650c184e0bb3?auto=format&fit=crop&w=1200&q=80`}
                          alt={project.title_en}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex gap-2 mb-4">
                        <span className="tag tag-cyan text-[9px]">{project.resolution_category || "1440P"}</span>
                      </div>
                      <h3 className="font-[var(--font-display)] text-xl font-bold text-white group-hover:text-[var(--cyan)] transition-colors">
                        {pickLocalized(lang, project.title_en, project.title_ar, project.title_en)}
                      </h3>
                      <p className="body-sm mt-3 line-clamp-2 flex-1">
                        {pickLocalized(lang, project.short_description_en, project.short_description_ar, project.short_description_en)}
                      </p>
                      <div className="mt-6 btn-link text-[var(--cyan)]">
                        {lang === "ar" ? "عرض" : "View"}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-glass py-24 text-center anim-up">
              <p className="mono-xs mb-4">{lang === "ar" ? "قريباً" : "COMING SOON"}</p>
              <p className="body-xl">{lang === "ar" ? "لا توجد مشاريع منشورة بعد" : "No projects published yet"}</p>
            </div>
          )}
        </div>
      </section>

      
      <section className="relative py-32 border-t border-white/5">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="anim-up">
            <p className="mono-xs purple mb-4">{lang === "ar" ? "الخدمات" : "SERVICES"}</p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h2 className="title-xl max-w-2xl">
                {lang === "ar"
                  ? "حلول أداء شاملة"
                  : "Complete Performance Solutions"}
              </h2>
              <Link href="/services" className="btn-secondary shrink-0">
                {lang === "ar" ? "كل الخدمات" : "All Services"}
              </Link>
            </div>
          </div>

          
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                titleEn: "Custom Builds",
                titleAr: "تجميعات مخصصة",
                descEn: "Hand-built systems optimized for your specific workloads.",
                descAr: "أنظمة مصنوعة يدوياً ومحسنة لأعبائك المحددة.",
                color: "var(--cyan)",
              },
              {
                num: "02",
                titleEn: "Optimization",
                titleAr: "تحسين الأداء",
                descEn: "Maximize existing hardware through advanced tuning.",
                descAr: "حقق أقصى استفادة من العتاد الحالي.",
                color: "var(--magenta)",
              },
              {
                num: "03",
                titleEn: "Consulting",
                titleAr: "استشارات تقنية",
                descEn: "Expert guidance on components and architecture.",
                descAr: "إرشادات متخصصة حول المكونات والبنية.",
                color: "var(--purple)",
              },
            ].map((service, i) => (
              <div key={i} className={`anim-up delay-${i + 1}`}>
                <div className="card-glass p-8 h-full group hover:border-[${service.color}] transition-all">
                  <p
                    className="font-[var(--font-display)] text-8xl font-black opacity-10 group-hover:opacity-30 transition-opacity"
                    style={{ color: service.color }}
                  >
                    {service.num}
                  </p>
                  <h3 className="font-[var(--font-display)] text-2xl font-bold text-white mt-4 group-hover:text-[var(--cyan)] transition-colors">
                    {lang === "ar" ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="body-md mt-4">
                    {lang === "ar" ? service.descAr : service.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="relative py-40 overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full bg-[var(--magenta)] opacity-10 blur-[200px]" />
        </div>

        <div className="relative mx-auto w-full max-w-4xl px-6 text-center">
          <div className="anim-scale">
            <p className="mono-xs lime mb-6">{lang === "ar" ? "ابدأ الآن" : "START NOW"}</p>
            <h2 className="title-xl">
              {lang === "ar" ? "جاهز لبناء" : "Ready to Build"}
              <br />
              <span className="text-[var(--magenta)]">{lang === "ar" ? "المستقبل؟" : "the Future?"}</span>
            </h2>
            <p className="body-xl mt-8 max-w-2xl mx-auto">
              {lang === "ar"
                ? "تواصل معنا للحصول على استشارة مجانية واكتشف كيف يمكننا مساعدتك."
                : "Contact us for a free consultation and discover how we can help."}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link href="/contact" className="btn-primary">
                {lang === "ar" ? "تواصل معنا" : "Get in Touch"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/projects" className="btn-tertiary">
                {lang === "ar" ? "شاهد أعمالنا" : "See Our Work"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
