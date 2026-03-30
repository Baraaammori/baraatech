import { cookies } from "next/headers";

export async function getServerLanguage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("site_lang")?.value;
  return lang === "ar" ? "ar" : "en";
}

export function pickLocalized(lang, englishValue, arabicValue, fallback = "") {
  if (lang === "ar") {
    return arabicValue || englishValue || fallback;
  }
  return englishValue || arabicValue || fallback;
}

export function getLocaleForLanguage(lang) {
  return lang === "ar" ? "ar-EG" : "en-US";
}
