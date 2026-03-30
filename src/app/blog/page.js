import Link from "next/link";
import Image from "next/image";
import PaginationNav from "@/components/public/pagination-nav";
import { listPublishedBlogsPage } from "@/lib/cms/public";
import { getLocaleForLanguage, getServerLanguage, pickLocalized } from "@/lib/i18n";

export const metadata = {
  title: "Blog | Baraa Tech",
  description: "Technical deep-dives, hardware reviews, and performance analysis from our engineering team.",
};

export default async function BlogPage({ searchParams }) {
  const lang = await getServerLanguage();
  const locale = getLocaleForLanguage(lang);
  const resolvedSearchParams = await searchParams;
  const page = Number.parseInt(String(resolvedSearchParams?.page ?? "1"), 10) || 1;
  const { items: blogs, page: currentPage, totalPages, totalCount } = await listPublishedBlogsPage({
    page,
    pageSize: 10,
  });

  return (
    <main className="flex-1">
      
      <section className="relative py-32 overflow-hidden">
        
        <div className="absolute top-0 left-[30%] w-[500px] h-[500px] rounded-full bg-[var(--magenta)] opacity-[0.05] blur-[120px]" />

        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="max-w-3xl anim-up">
            <p className="mono-xs magenta mb-6">{lang === "ar" ? "المدونة" : "BLOG"}</p>
            <h1 className="title-xl">
              {lang === "ar" ? "يوميات" : "Lab"}
              <br />
              <span className="text-[var(--magenta)]">{lang === "ar" ? "المختبر" : "Journal"}</span>
            </h1>
            <p className="body-xl mt-8">
              {lang === "ar"
                ? "تحليلات عميقة، مراجعات العتاد، وإرشادات تقنية من فريقنا الهندسي."
                : "Deep-dives, hardware reviews, and technical guides from our engineering team."}
            </p>
          </div>
        </div>
      </section>

      
      <section className="pb-32">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          {blogs.length > 0 ? (
            <div className="space-y-8 lg:space-y-10">
              <div className="text-sm text-[var(--gray-400)]">
                {lang === "ar"
                  ? `اجمالي المقالات: ${totalCount}`
                  : `Total articles: ${totalCount}`}
              </div>
              
              {blogs[0] && (
                <article className="card-neon group anim-up">
                  <div className="card-neon-inner p-0 overflow-hidden">
                    <div className="grid lg:grid-cols-2">
                      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px] overflow-hidden rounded-t-[28px] lg:rounded-l-[28px] lg:rounded-tr-none">
                        <Image
                          src={
                            blogs[0].featured_image_url ||
                            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80"
                          }
                          alt={pickLocalized(lang, blogs[0].title_en, blogs[0].title_ar, blogs[0].title_en)}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60 lg:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 lg:hidden" />
                      </div>
                      <div className="p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                          <span className="tag tag-magenta text-[9px] lg:text-[11px]">{lang === "ar" ? "مميز" : "FEATURED"}</span>
                          <span className="text-xs lg:text-sm text-[var(--gray-400)]">
                            {new Date(blogs[0].created_at).toLocaleDateString(locale)}
                          </span>
                        </div>
                        <h2 className="font-[var(--font-display)] text-xl lg:text-2xl xl:text-3xl font-bold text-white transition-colors group-hover:text-[var(--cyan)]">
                          {pickLocalized(lang, blogs[0].title_en, blogs[0].title_ar, blogs[0].title_en)}
                        </h2>
                        <p className="body-md lg:body-lg mt-4 lg:mt-6 line-clamp-3">
                          {pickLocalized(lang, blogs[0].excerpt_en, blogs[0].excerpt_ar, "") ||
                           (lang === "ar" ? "اقرأ المزيد لاكتشاف التفاصيل الكاملة..." : "Read more to discover the full details...")}
                        </p>
                        <Link
                          href={`/blog/${blogs[0].slug}`}
                          className="btn-link text-[var(--cyan)] mt-6 lg:mt-8"
                        >
                          {lang === "ar" ? "اقرأ المقال" : "Read Article"}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              
              {blogs.length > 1 && (
                <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {blogs.slice(1).map((post, index) => (
                    <article
                      key={post.id}
                      className={`card-solid group overflow-hidden anim-up delay-${(index % 6) + 1} hover:border-[var(--magenta)] transition-all`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={
                            post.featured_image_url ||
                            [
                              "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
                              "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
                            ][index % 2]
                          }
                          alt={pickLocalized(lang, post.title_en, post.title_ar, post.title_en)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      </div>

                      <div className="p-5 lg:p-6">
                        <p className="mono-xs text-[var(--gray-600)] mb-3 lg:mb-4 text-[10px] lg:text-[11px]">
                          {new Date(post.created_at).toLocaleDateString(locale)}
                        </p>
                        <h3 className="font-[var(--font-display)] text-lg lg:text-xl font-bold text-white transition-colors group-hover:text-[var(--magenta)] line-clamp-2">
                          {pickLocalized(lang, post.title_en, post.title_ar, post.title_en)}
                        </h3>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="btn-link text-[var(--magenta)] mt-4 lg:mt-6"
                        >
                          {lang === "ar" ? "اقرأ المزيد" : "Read More"}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              <PaginationNav page={currentPage} totalPages={totalPages} basePath="/blog" lang={lang} />
            </div>
          ) : (
            <div className="card-glass py-24 text-center anim-up">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--magenta)]/10 border border-[var(--magenta)]/30 text-[var(--magenta)] mx-auto mb-8">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-white">
                {lang === "ar" ? "لا توجد مقالات بعد" : "No Articles Yet"}
              </h3>
              <p className="body-lg mt-4">
                {lang === "ar" ? "ستظهر المقالات هنا قريباً." : "Articles will appear here soon."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
