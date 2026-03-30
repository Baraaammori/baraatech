import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/cms/public";
import ProjectInterestForm from "@/components/public/project-interest-form";
import { getServerLanguage, pickLocalized } from "@/lib/i18n";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title_en,
    description: project.short_description_en,
  };
}

export default async function ProjectDetailsPage({ params }) {
  const lang = await getServerLanguage();
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <section className="tech-shell py-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">{lang === "ar" ? "ملف التجميعة" : "Build Profile"}</p>
            <h1 className="mt-2 font-[var(--font-display)] text-4xl font-black text-[#effff8]">
              {pickLocalized(lang, project.title_en, project.title_ar, project.title_en)}
            </h1>
            <p className="mt-4 text-[#b4c8c0]">
              {pickLocalized(lang, project.full_description_en, project.full_description_ar, project.full_description_en)}
            </p>
          </div>
          <div className="border-l border-[rgba(4,217,196,0.24)] pl-4">
            <Image
              src={
                project.main_image_url ||
                "https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=1200&q=80"
              }
              alt={pickLocalized(lang, project.title_en, project.title_ar, project.title_en)}
              width={1200}
              height={900}
              className="h-[290px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-3 border-y border-[rgba(118,185,0,0.2)] py-5 text-[#d4e4df] md:grid-cols-2">
        <p><strong>{lang === "ar" ? "المعالج:" : "CPU:"}</strong> {project.cpu}</p>
        <p><strong>{lang === "ar" ? "البطاقة الرسومية:" : "GPU:"}</strong> {project.gpu}</p>
        <p><strong>{lang === "ar" ? "الذاكرة:" : "RAM:"}</strong> {project.ram}</p>
        <p><strong>{lang === "ar" ? "التخزين:" : "Storage:"}</strong> {project.storage}</p>
        <p><strong>{lang === "ar" ? "اللوحة الأم:" : "Motherboard:"}</strong> {project.motherboard}</p>
        <p><strong>{lang === "ar" ? "مزود الطاقة:" : "PSU:"}</strong> {project.psu}</p>
        <p><strong>{lang === "ar" ? "الصندوق:" : "Case:"}</strong> {project.case_name}</p>
        <p><strong>{lang === "ar" ? "التبريد:" : "Cooling:"}</strong> {project.cooling}</p>
        <p><strong>{lang === "ar" ? "السعر:" : "Price:"}</strong> ${project.price}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="border-y border-[rgba(4,217,196,0.2)] py-4">
          <h2 className="font-[var(--font-display)] text-xl font-semibold text-[#ecfff7]">{lang === "ar" ? "الاختبارات (FPS)" : "Benchmarks (FPS)"}</h2>
          <pre className="mt-4 overflow-auto border border-[rgba(4,217,196,0.2)] bg-[rgba(7,14,18,0.5)] p-3 text-sm text-[#afd0c5]">
            {JSON.stringify(project.benchmarks, null, 2)}
          </pre>
        </section>
        <ProjectInterestForm projectId={project.id} projectSlug={project.slug} />
      </div>
    </main>
  );
}
