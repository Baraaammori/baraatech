import Link from "next/link";
import Image from "next/image";
import PaginationNav from "@/components/public/pagination-nav";
import { listPublishedNewsPage } from "@/lib/cms/public";
import { getLocaleForLanguage, getServerLanguage, pickLocalized } from "@/lib/i18n";

export const metadata = {
  title: "News | Baraa Tech",
  description: "Latest tech industry updates, hardware releases, and performance breakthroughs.",
};

export default async function NewsPage({ searchParams }) {
  const lang = await getServerLanguage();
  const locale = getLocaleForLanguage(lang);
  const resolvedSearchParams = await searchParams;
  const page = Number.parseInt(String(resolvedSearchParams?.page ?? "1"), 10) || 1;
  const { items, page: currentPage, totalPages, totalCount } = await listPublishedNewsPage({
    page,
    pageSize: 10,
  });

  return (
    <main className="flex-1">
      
      <section className="relative py-32 overflow-hidden">
        
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rounded-full bg-[var(--lime)] opacity-[0.03] blur-[120px]" />

        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="max-w-3xl anim-up">
            <p className="mono-xs lime mb-6">{lang === "ar" ? "الأخبار" : "NEWS"}</p>
            <h1 className="title-xl">
              {lang === "ar" ? "رادار" : "Industry"}
              <br />
              <span className="text-[var(--lime)]">{lang === "ar" ? "الصناعة" : "Radar"}</span>
            </h1>
            <p className="body-xl mt-8">
              {lang === "ar"
                ? "آخر تحديثات صناعة التقنية، إصدارات العتاد الجديدة، واختراقات الأداء."
                : "Latest tech industry updates, hardware releases, and performance breakthroughs."}
            </p>
          </div>
        </div>
      </section>

      
      <section className="pb-32">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          {items.length > 0 ? (
            <>
              <div className="mb-6 text-sm text-[var(--gray-400)]">
                {lang === "ar" ? `اجمالي الاخبار: ${totalCount}` : `Total news: ${totalCount}`}
              </div>
              <div className="space-y-6 lg:space-y-8">
                {items.map((item, index) => (
                  <article
                    key={item.id}
                    className={`card-solid group overflow-hidden anim-up delay-${(index % 6) + 1} hover:border-[var(--lime)] transition-all`}
                  >
                    <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[400px_1fr]">
                      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[200px] overflow-hidden">
                        <Image
                          src={
                            item.image_url ||
                            [
                              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
                              "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
                            ][index % 2]
                          }
                          alt={pickLocalized(lang, item.title_en, item.title_ar, item.title_en)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40 hidden md:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 md:hidden" />
                      </div>

                      <div className="p-5 md:p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                          <span className="tag tag-lime text-[9px] lg:text-[10px]">
                            {lang === "ar" ? "تحديث" : "UPDATE"}
                          </span>
                          <span className="text-xs lg:text-sm text-[var(--gray-400)]">
                            {new Date(item.created_at).toLocaleDateString(locale)}
                          </span>
                        </div>

                        <h2 className="font-[var(--font-display)] text-lg lg:text-xl xl:text-2xl font-bold text-white transition-colors group-hover:text-[var(--lime)]">
                          {pickLocalized(lang, item.title_en, item.title_ar, item.title_en)}
                        </h2>

                        <p className="body-sm lg:body-md mt-3 lg:mt-4 line-clamp-2">
                          {pickLocalized(lang, item.excerpt_en, item.excerpt_ar, "") ||
                           (lang === "ar" ? "اقرأ المزيد للتفاصيل الكاملة..." : "Read more for full details...")}
                        </p>

                        <Link
                          href={`/news/${item.slug}`}
                          className="btn-link text-[var(--lime)] mt-4 lg:mt-6"
                        >
                          {lang === "ar" ? "اقرأ الخبر" : "Read News"}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <PaginationNav page={currentPage} totalPages={totalPages} basePath="/news" lang={lang} />
            </>
          ) : (
            <div className="card-glass py-24 text-center anim-up">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--lime)]/10 border border-[var(--lime)]/30 text-[var(--lime)] mx-auto mb-8">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-white">
                {lang === "ar" ? "لا توجد أخبار بعد" : "No News Yet"}
              </h3>
              <p className="body-lg mt-4">
                {lang === "ar" ? "ستظهر الأخبار هنا قريباً." : "News will appear here soon."}
              </p>
            </div>
          )}
        </div>
      </section>

      
      <section className="relative py-32 border-t border-white/5">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
          <div className="card-glass p-12 lg:p-16 text-center anim-scale">
            <p className="mono-xs mb-6">{lang === "ar" ? "ابق على اطلاع" : "STAY UPDATED"}</p>
            <h2 className="title-lg">
              {lang === "ar" ? "احصل على" : "Get the"}
              <br />
              <span className="text-[var(--cyan)]">{lang === "ar" ? "آخر الأخبار" : "Latest News"}</span>
            </h2>
            <p className="body-lg mt-8 max-w-2xl mx-auto">
              {lang === "ar"
                ? "تابعنا على وسائل التواصل الاجتماعي للحصول على أحدث التحديثات والإعلانات."
                : "Follow us on social media for the latest updates and announcements."}
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <a
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10 text-[var(--gray-400)] transition-all hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                aria-label="Twitter"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10 text-[var(--gray-400)] transition-all hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                aria-label="YouTube"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
