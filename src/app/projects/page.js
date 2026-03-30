import Link from "next/link";
import Image from "next/image";
import PaginationNav from "@/components/public/pagination-nav";
import { listPublishedProjectsPage } from "@/lib/cms/public";
import { getServerLanguage, pickLocalized } from "@/lib/i18n";

export const metadata = {
  title: "Builds | Baraa Tech",
  description: "Explore benchmark-backed PC builds optimized for gaming, content creation, and professional workloads.",
};

export default async function ProjectsPage({ searchParams }) {
  const lang = await getServerLanguage();
  const resolvedSearchParams = await searchParams;
  const page = Number.parseInt(String(resolvedSearchParams?.page ?? "1"), 10) || 1;
  const { items: projects, page: currentPage, totalPages, totalCount } = await listPublishedProjectsPage({
    page,
    pageSize: 9,
  });

  return (
    <main className="flex-1">
      
      <section className="relative py-20 lg:py-32 overflow-hidden">
        
        <div className="absolute top-0 right-[20%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-[var(--cyan)] opacity-[0.05] blur-[120px]" />

        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="max-w-3xl anim-up">
            <p className="mono-xs mb-4 lg:mb-6">{lang === "ar" ? "التجميعات" : "BUILDS"}</p>
            <h1 className="title-xl">
              {lang === "ar" ? "أنظمة عالية" : "High-Performance"}
              <br />
              <span className="text-[var(--cyan)]">{lang === "ar" ? "الأداء" : "Systems"}</span>
            </h1>
            <p className="body-xl mt-6 lg:mt-8">
              {lang === "ar"
                ? "تصفح أجهزة مدعومة باختبارات الأداء، مهيأة للألعاب والإنتاج الإبداعي والأعمال الاحترافية."
                : "Browse benchmark-backed machines optimized for gaming, content creation, and professional workloads."}
            </p>
          </div>

          
          <div className="mt-8 lg:mt-12 flex flex-wrap gap-3 lg:gap-4 anim-up delay-1">
            <button className="tag tag-cyan text-[9px] lg:text-[10px]">
              {lang === "ar" ? "الكل" : "All"}
            </button>
            <button className="tag tag-magenta text-[9px] lg:text-[10px] opacity-60 hover:opacity-100 transition-opacity">
              {lang === "ar" ? "ألعاب" : "Gaming"}
            </button>
            <button className="tag tag-lime text-[9px] lg:text-[10px] opacity-60 hover:opacity-100 transition-opacity">
              {lang === "ar" ? "إبداع" : "Creative"}
            </button>
            <button className="tag tag-purple text-[9px] lg:text-[10px] opacity-60 hover:opacity-100 transition-opacity">
              {lang === "ar" ? "احترافي" : "Workstation"}
            </button>
          </div>
        </div>
      </section>

      
      <section className="pb-20 lg:pb-32">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          {projects.length > 0 ? (
            <>
              <div className="mb-6 text-sm text-[var(--gray-400)]">
                {lang === "ar"
                  ? `اجمالي النتائج: ${totalCount}`
                  : `Total results: ${totalCount}`}
              </div>
              <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <article
                    key={project.id}
                    className={`card-solid group overflow-hidden anim-up delay-${(index % 6) + 1} hover:border-[var(--cyan)] transition-all`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={
                          project.main_image_url ||
                          [
                            "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1555618254-4b502d16f3f9?auto=format&fit=crop&w=1200&q=80",
                          ][index % 3]
                        }
                        alt={project.title_en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                      
                      <div className="absolute top-3 left-3 lg:top-4 lg:left-4 flex gap-2">
                        {project.resolution_category && (
                          <span className="tag tag-cyan text-[8px] lg:text-[9px]">{project.resolution_category}</span>
                        )}
                        {project.performance_category && (
                          <span className="tag tag-magenta text-[8px] lg:text-[9px]">{project.performance_category}</span>
                        )}
                      </div>

                      
                      {project.price && (
                        <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
                          <span className="tag tag-lime text-[8px] lg:text-[9px]">${project.price}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 lg:p-6">
                      <h2 className="font-[var(--font-display)] text-lg lg:text-xl font-bold text-white transition-colors group-hover:text-[var(--cyan)]">
                        {pickLocalized(lang, project.title_en, project.title_ar, project.title_en)}
                      </h2>
                      <p className="body-sm mt-3 line-clamp-2">
                        {pickLocalized(lang, project.short_description_en, project.short_description_ar, project.short_description_en)}
                      </p>

                      <div className="mt-5 lg:mt-6">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="btn-link text-[var(--cyan)]"
                        >
                          {lang === "ar" ? "عرض التفاصيل" : "View Details"}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <PaginationNav page={currentPage} totalPages={totalPages} basePath="/projects" lang={lang} />
            </>
          ) : (
            <div className="card-glass py-16 lg:py-24 text-center anim-up">
              <div className="flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl lg:rounded-2xl bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-[var(--cyan)] mx-auto mb-6 lg:mb-8">
                <svg className="w-8 h-8 lg:w-10 lg:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                </svg>
              </div>
              <h3 className="font-[var(--font-display)] text-xl lg:text-2xl font-bold text-white">
                {lang === "ar" ? "لا توجد مشاريع بعد" : "No Projects Yet"}
              </h3>
              <p className="body-lg mt-4">
                {lang === "ar" ? "ستظهر المشاريع هنا قريباً." : "Projects will appear here soon."}
              </p>
            </div>
          )}
        </div>
      </section>

      
      <section className="relative py-20 lg:py-32 border-t border-white/5">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-12 text-center">
          <div className="anim-up">
            <p className="mono-xs magenta mb-4 lg:mb-6">{lang === "ar" ? "تجميعة مخصصة" : "CUSTOM BUILD"}</p>
            <h2 className="title-lg">
              {lang === "ar" ? "لم تجد ما" : "Can't Find What"}
              <br />
              <span className="text-[var(--magenta)]">{lang === "ar" ? "تبحث عنه؟" : "You're Looking For?"}</span>
            </h2>
            <p className="body-lg mt-6 lg:mt-8 max-w-2xl mx-auto">
              {lang === "ar"
                ? "نصمم ونبني أنظمة مخصصة بالكامل حسب احتياجاتك وميزانيتك."
                : "We design and build fully custom systems tailored to your needs and budget."}
            </p>
            <Link href="/contact" className="btn-primary mt-8 lg:mt-12">
              {lang === "ar" ? "اطلب تجميعة مخصصة" : "Request Custom Build"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
