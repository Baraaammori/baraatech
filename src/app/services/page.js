import Image from "next/image";
import Link from "next/link";
import PaginationNav from "@/components/public/pagination-nav";
import { listPublishedServicesPage } from "@/lib/cms/public";
import { getServerLanguage, pickLocalized } from "@/lib/i18n";

export const metadata = {
  title: "Services | Baraa Tech",
  description: "Professional PC building, performance optimization, and technical consulting services.",
};

const serviceIcons = [
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>,
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>,
];

const placeholderServices = [
  {
    id: 1,
    title_en: "Custom PC Building",
    title_ar: "تجميع أجهزة مخصصة",
    short_description_en: "Hand-built systems optimized for your specific use case, whether gaming, content creation, or professional workloads.",
    short_description_ar: "أنظمة مبنية يدوياً ومحسنة لاستخدامك المحدد، سواء للألعاب أو إنشاء المحتوى أو الأعمال الاحترافية.",
    image_url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title_en: "Performance Optimization",
    title_ar: "تحسين الأداء",
    short_description_en: "Maximize your existing hardware through advanced tuning, thermal optimization, and software configuration.",
    short_description_ar: "حقق أقصى استفادة من عتادك الحالي من خلال الضبط المتقدم وتحسين الحرارة وتكوين البرامج.",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title_en: "Technical Consulting",
    title_ar: "استشارات تقنية",
    short_description_en: "Expert guidance on component selection, upgrade paths, and system architecture for any budget.",
    short_description_ar: "إرشادات متخصصة حول اختيار المكونات ومسارات الترقية وبنية النظام لأي ميزانية.",
    image_url: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title_en: "Benchmark Analysis",
    title_ar: "تحليل الاختبارات",
    short_description_en: "Comprehensive performance testing with detailed reports and actionable recommendations.",
    short_description_ar: "اختبار أداء شامل مع تقارير مفصلة وتوصيات قابلة للتنفيذ.",
    image_url: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default async function ServicesPage({ searchParams }) {
  const lang = await getServerLanguage();
  const resolvedSearchParams = await searchParams;
  const page = Number.parseInt(String(resolvedSearchParams?.page ?? "1"), 10) || 1;
  const { items: dbServices, page: currentPage, totalPages, totalCount } = await listPublishedServicesPage({
    page,
    pageSize: 6,
  });
  const services = dbServices.length > 0 ? dbServices : placeholderServices;

  return (
    <main className="flex-1">
      
      <section className="relative py-32 overflow-hidden">
        
        <div className="absolute top-0 left-[30%] w-[500px] h-[500px] rounded-full bg-[var(--cyan)] opacity-[0.05] blur-[120px]" />

        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center anim-up">
            <p className="mono-xs mb-6">{lang === "ar" ? "الخدمات" : "SERVICES"}</p>
            <h1 className="title-xl">
              {lang === "ar" ? "حلول هندسية" : "Complete Engineering"}
              <br />
              <span className="text-[var(--cyan)]">
                {lang === "ar" ? "متكاملة" : "Solutions"}
              </span>
            </h1>
            <p className="body-xl mt-8 max-w-2xl mx-auto">
              {lang === "ar"
                ? "من الاستشارات الأولية إلى التنفيذ والدعم المستمر، نقدم خدمات شاملة لتحقيق أعلى مستويات الأداء."
                : "From initial consulting to implementation and ongoing support, we provide comprehensive services to achieve peak performance."}
            </p>
          </div>
        </div>
      </section>

      
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          {dbServices.length > 0 ? (
            <p className="mb-6 text-sm text-[var(--gray-400)]">
              {lang === "ar" ? `اجمالي الخدمات: ${totalCount}` : `Total services: ${totalCount}`}
            </p>
          ) : null}
          <div className="space-y-16 lg:space-y-32">
            {services.map((service, index) => (
              <article
                key={service.id}
                className={`grid gap-8 lg:gap-16 lg:grid-cols-2 lg:items-center anim-up delay-${(index % 3) + 1}`}
              >
                
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                    <div className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-xl lg:rounded-2xl bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-[var(--cyan)]">
                      {serviceIcons[index % serviceIcons.length]}
                    </div>
                    <span className="tag tag-cyan text-[9px] lg:text-[11px]">
                      {lang === "ar" ? `الخدمة ${String(index + 1).padStart(2, "0")}` : `SERVICE ${String(index + 1).padStart(2, "0")}`}
                    </span>
                  </div>

                  <h2 className="title-lg">
                    {pickLocalized(lang, service.title_en, service.title_ar, service.title_en)}
                  </h2>

                  <p className="body-lg mt-6">
                    {pickLocalized(lang, service.short_description_en, service.short_description_ar, service.short_description_en)}
                  </p>

                  
                  <div className="mt-8 lg:mt-10 grid gap-3 sm:gap-4 grid-cols-2">
                    {[
                      { en: "Expert consultation", ar: "استشارة متخصصة" },
                      { en: "Quality components", ar: "مكونات عالية الجودة" },
                      { en: "Warranty included", ar: "ضمان مشمول" },
                      { en: "Ongoing support", ar: "دعم مستمر" },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 lg:gap-3">
                        <span className="h-2 w-2 rounded-full bg-[var(--cyan)] flex-shrink-0" />
                        <span className="text-[var(--gray-400)] text-sm lg:text-base">
                          {lang === "ar" ? feature.ar : feature.en}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className="btn-primary mt-8 lg:mt-12 text-sm lg:text-base">
                    {lang === "ar" ? "اطلب هذه الخدمة" : "Request This Service"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                
                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="card-neon group">
                    <div className="card-neon-inner p-0 overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
                        <Image
                          src={
                            service.image_url ||
                            [
                              "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                              "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80",
                            ][index % 2]
                          }
                          alt={service.title_en}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      </div>
                    </div>
                  </div>

                  
                  <div
                    className="absolute -bottom-6 card-glass px-6 py-4"
                    style={{ [index % 2 === 0 ? "right" : "left"]: "-1rem" }}
                  >
                    <p className="mono-xs lime">
                      {lang === "ar" ? "متاح الآن" : "AVAILABLE NOW"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {dbServices.length > 0 ? (
            <PaginationNav page={currentPage} totalPages={totalPages} basePath="/services" lang={lang} />
          ) : null}
        </div>
      </section>

      
      <section className="relative py-32 border-t border-white/5 mt-16">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="text-center mb-20 anim-up">
            <p className="mono-xs magenta mb-6">{lang === "ar" ? "كيف نعمل" : "HOW WE WORK"}</p>
            <h2 className="title-lg">
              {lang === "ar" ? "عملية العمل" : "Our Process"}
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                en: "Consultation",
                ar: "الاستشارة",
                descEn: "We discuss your needs, budget, and goals.",
                descAr: "نناقش احتياجاتك وميزانيتك وأهدافك.",
                color: "cyan",
              },
              {
                step: "02",
                en: "Planning",
                ar: "التخطيط",
                descEn: "We design the optimal solution for you.",
                descAr: "نصمم الحل الأمثل لك.",
                color: "magenta",
              },
              {
                step: "03",
                en: "Execution",
                ar: "التنفيذ",
                descEn: "We build, test, and optimize your system.",
                descAr: "نبني ونختبر ونحسن نظامك.",
                color: "lime",
              },
              {
                step: "04",
                en: "Support",
                ar: "الدعم",
                descEn: "We provide ongoing assistance and updates.",
                descAr: "نقدم المساعدة والتحديثات المستمرة.",
                color: "purple",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`card-solid p-6 lg:p-10 text-center anim-up delay-${i + 1} group hover:border-[var(--${item.color})] transition-all`}
              >
                <p
                  className="font-[var(--font-display)] text-4xl lg:text-6xl font-black opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ color: `var(--${item.color})` }}
                >
                  {item.step}
                </p>
                <h3 className="font-[var(--font-display)] text-lg lg:text-2xl font-bold text-white mt-4 lg:mt-6 group-hover:text-[var(--cyan)] transition-colors">
                  {lang === "ar" ? item.ar : item.en}
                </h3>
                <p className="body-sm lg:body-md mt-3 lg:mt-4">
                  {lang === "ar" ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="relative py-32">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
          <div className="card-glass p-12 lg:p-16 text-center anim-scale">
            <p className="mono-xs lime mb-6">{lang === "ar" ? "ابدأ الآن" : "GET STARTED"}</p>
            <h2 className="title-lg">
              {lang === "ar" ? "جاهز لتحسين" : "Ready to Upgrade"}
              <br />
              <span className="text-[var(--lime)]">{lang === "ar" ? "أدائك؟" : "Your Performance?"}</span>
            </h2>
            <p className="body-lg mt-8 max-w-2xl mx-auto">
              {lang === "ar"
                ? "تواصل معنا اليوم للحصول على استشارة مجانية ودعنا نساعدك في تحقيق أهدافك التقنية."
                : "Contact us today for a free consultation and let us help you achieve your tech goals."}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link href="/contact" className="btn-primary">
                {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/projects" className="btn-secondary">
                {lang === "ar" ? "شاهد أعمالنا" : "View Our Work"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
