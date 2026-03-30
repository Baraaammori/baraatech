import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogBySlug } from "@/lib/cms/public";
import { getLocaleForLanguage, getServerLanguage, pickLocalized } from "@/lib/i18n";

export default async function BlogDetailsPage({ params }) {
  const lang = await getServerLanguage();
  const locale = getLocaleForLanguage(lang);
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <section className="tech-shell py-7 md:py-9">
        <p className="text-xs uppercase tracking-[0.22em] text-lime-200/80">{lang === "ar" ? "مقال" : "Article"}</p>
        <h1 className="mt-2 font-[var(--font-display)] text-4xl font-black text-[#ecfff8]">
          {pickLocalized(lang, post.title_en, post.title_ar, post.title_en)}
        </h1>
        <p className="mt-2 text-sm text-[#9db3ab]">
          {lang === "ar" ? "آخر تحديث" : "Updated"} {new Date(post.updated_at).toLocaleDateString(locale)}
        </p>
        <div className="mt-6 border-l border-[rgba(118,185,0,0.24)] pl-4">
          <Image
            src={post.featured_image_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"}
            alt={pickLocalized(lang, post.title_en, post.title_ar, post.title_en)}
            width={1200}
            height={850}
            className="h-[300px] w-full object-cover"
          />
        </div>
      </section>
      <article className="prose prose-invert mt-8 max-w-none border-y border-[rgba(4,217,196,0.2)] py-7 whitespace-pre-wrap text-[#d6e8e1]">
        {pickLocalized(lang, post.content_en, post.content_ar, post.content_en)}
      </article>
    </main>
  );
}
