import { Orbitron, Outfit, JetBrains_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/public/site-header";
import SiteFooter from "@/components/public/site-footer";
import { getServerLanguage } from "@/lib/i18n";

const displayFont = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bodyFont = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const codeFont = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const arabicFont = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Baraa Tech | Cybernetic Hardware Intelligence",
  description: "Next-generation GPU builds, benchmarks, and performance analysis for serious builders and creators.",
};

export default async function RootLayout({ children }) {
  const lang = await getServerLanguage();
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${displayFont.variable} ${bodyFont.variable} ${codeFont.variable} ${arabicFont.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className={`min-h-screen flex flex-col ${lang === "ar" ? "arabic" : ""}`}
      >
        <SiteHeader />
        <div className="flex-1 flex flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
