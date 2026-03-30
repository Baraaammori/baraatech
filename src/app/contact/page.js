import Image from "next/image";
import { notFound } from "next/navigation";
import ContactForm from "@/components/public/contact-form";
import { getServerLanguage } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Contact | Baraa Tech",
  description: "Get in touch with our team for custom builds, technical consulting, or any hardware-related questions.",
};

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: contactEntries } = await supabase
    .from("pages_content")
    .select("page_key, published")
    .in("page_key", ["contact", "contact-us"]);

  const isUnpublished = (contactEntries ?? []).some((entry) => entry.published === false);
  if (isUnpublished) {
    notFound();
  }

  const lang = await getServerLanguage();

  return (
    <main className="flex-1">
      
      <section className="relative py-20 lg:py-32 overflow-hidden">
        
        <div className="absolute top-0 left-[20%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-[var(--cyan)] opacity-[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-[20%] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] rounded-full bg-[var(--magenta)] opacity-[0.05] blur-[100px]" />

        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 lg:items-start">
            
            <div className="anim-up">
              <p className="mono-xs mb-4 lg:mb-6">{"// "}{lang === "ar" ? "تواصل معنا" : "GET IN TOUCH"}</p>
              <h1 className="title-xl">
                {lang === "ar" ? "ابدأ" : "Start a"}
                <br />
                <span className="text-[var(--cyan)]">
                  {lang === "ar" ? "محادثة" : "Conversation"}
                </span>
              </h1>
              <p className="body-xl mt-6 lg:mt-8 max-w-lg">
                {lang === "ar"
                  ? "أخبرنا عن تحديات العتاد لديك أو مشروعك القادم. نحن هنا للمساعدة."
                  : "Tell us about your hardware challenges or next project. We're here to help."}
              </p>

              
              <div className="mt-8 lg:mt-12 space-y-5 lg:space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    ),
                    labelEn: "Email",
                    labelAr: "البريد الإلكتروني",
                    value: "baraaammori2004@gmail.com",
                    color: "cyan",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    ),
                    labelEn: "Location",
                    labelAr: "الموقع",
                    value: lang === "ar" ? "صيدا، لبنان" : "Saida, Lebanon",
                    color: "magenta",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    ),
                    labelEn: "Phone",
                    labelAr: "الهاتف",
                    value: "81629778",
                    color: "lime",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 lg:gap-5 group">
                    <div
                      className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl lg:rounded-2xl transition-all group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] flex-shrink-0"
                      style={{
                        background: `rgba(var(--${item.color === "cyan" ? "0, 229, 255" : item.color === "magenta" ? "255, 0, 128" : "0, 255, 106"}), 0.1)`,
                        border: `1px solid rgba(var(--${item.color === "cyan" ? "0, 229, 255" : item.color === "magenta" ? "255, 0, 128" : "0, 255, 106"}), 0.3)`,
                        color: `var(--${item.color})`,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="mono-xs text-[10px] lg:text-[11px]" style={{ color: `var(--${item.color})` }}>
                        {lang === "ar" ? item.labelAr : item.labelEn}
                      </p>
                      <p className="text-white font-medium mt-1 text-sm lg:text-base break-words">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              
              <div className="mt-12 lg:mt-16 relative anim-up delay-2 hidden lg:block">
                <div className="card-solid overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
                    alt="Futuristic server room lighting"
                    width={600}
                    height={300}
                    className="aspect-[2/1] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            
            <div className="anim-up delay-1">
              <div className="card-glass p-6 lg:p-8 xl:p-10">
                <h2 className="font-[var(--font-display)] text-xl lg:text-2xl font-bold text-white mb-6 lg:mb-8">
                  {lang === "ar" ? "أرسل رسالة" : "Send a Message"}
                </h2>
                <ContactForm lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="relative py-20 lg:py-32 border-t border-white/5">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
          <div className="text-center mb-12 lg:mb-16 anim-up">
            <p className="mono-xs magenta mb-4 lg:mb-6">{lang === "ar" ? "أسئلة شائعة" : "FAQ"}</p>
            <h2 className="title-lg">
              {lang === "ar" ? "أسئلة متكررة" : "Common Questions"}
            </h2>
          </div>

          <div className="space-y-5 lg:space-y-6">
            {[
              {
                qEn: "How long does a custom build take?",
                qAr: "كم يستغرق التجميع المخصص؟",
                aEn: "Typically 1-2 weeks from consultation to delivery, depending on component availability.",
                aAr: "عادة من 1-2 أسبوع من الاستشارة حتى التسليم، حسب توفر المكونات.",
              },
              {
                qEn: "Do you offer remote consulting?",
                qAr: "هل تقدمون استشارات عن بعد؟",
                aEn: "Yes, we offer video consultations and can guide you through builds remotely.",
                aAr: "نعم، نقدم استشارات بالفيديو ويمكننا إرشادك خلال التجميع عن بعد.",
              },
              {
                qEn: "What's your pricing model?",
                qAr: "ما هو نموذج التسعير الخاص بكم؟",
                aEn: "We charge a flat service fee plus component costs at market price. No hidden fees.",
                aAr: "نفرض رسوم خدمة ثابتة بالإضافة إلى تكلفة المكونات بسعر السوق. لا رسوم خفية.",
              },
            ].map((faq, i) => (
              <div key={i} className={`card-solid p-6 lg:p-8 anim-up delay-${i + 1} group hover:border-[var(--cyan)] transition-all`}>
                <h3 className="font-[var(--font-display)] text-lg lg:text-xl font-bold text-white group-hover:text-[var(--cyan)] transition-colors">
                  {lang === "ar" ? faq.qAr : faq.qEn}
                </h3>
                <p className="body-md mt-3 lg:mt-4">
                  {lang === "ar" ? faq.aAr : faq.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
