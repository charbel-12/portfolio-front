import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import LanguageProvider from "@/components/LanguageProvider";
const display=Space_Grotesk({subsets:["latin"],weight:["500","600","700"],variable:"--font-display",display:"swap"});
const body=Inter({subsets:["latin"],weight:["400","500","600"],variable:"--font-body",display:"swap"});
const mono=JetBrains_Mono({subsets:["latin"],weight:["400","500"],variable:"--font-mono",display:"swap"});

export const themeScript = `try { var saved = localStorage.getItem('portfolio-theme'); document.documentElement.dataset.theme = saved === 'light' || saved === 'dark' ? saved : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch { document.documentElement.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }`;

export function portfolioMetadata(language: "en" | "ar"): Metadata {
 const isArabic = language === "ar";
 const title = isArabic ? "شربل مدور — مهندس برمجيات" : "Charbel Mdawar — Software Engineer";
 const description = isArabic ? "شربل مدور، مهندس برمجيات متخصص في تطوير الخدمات الخلفية وضمان الجودة. استكشف خبراته في Java وSpring Boot وLaravel والأنظمة اللحظية وقيادة الاختبارات." : "Software engineer specializing in backend development and quality engineering. Explore Java, Spring Boot, Laravel, real-time systems, and QA leadership.";
 const url = isArabic ? "/ar" : "/";
 return {
  metadataBase: new URL("https://charbelmdawar.com"), title, description,
  alternates: { canonical: url, languages: { en: "/", ar: "/ar", "x-default": "/" } },
  openGraph: { title, description, type: "website", locale: isArabic ? "ar_SY" : "en_US", alternateLocale: [isArabic ? "en_US" : "ar_SY"], url, siteName: "Charbel Mdawar", images: [{ url: "/og.png", width: 1730, height: 909, alt: "Charbel Mdawar — Software Engineer" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
 };
}

export default function SiteDocument({ children, language }: { children: React.ReactNode; language: "en" | "ar" }) {
 const url = language === "ar" ? "https://charbelmdawar.com/ar" : "https://charbelmdawar.com/";
 const structuredData = { "@context": "https://schema.org", "@type": "ProfilePage", "@id": url + "#profile", url, inLanguage: language, mainEntity: { "@type": "Person", "@id": "https://charbelmdawar.com/#person", name: "Charbel Mdawar", alternateName: "شربل مدور", url: "https://charbelmdawar.com/", image: "https://charbelmdawar.com/charbel-mdawar.jpg", jobTitle: "Software Engineer", knowsLanguage: ["en", "ar"] } };
 return <html lang={language} dir={language === "ar" ? "rtl" : "ltr"} suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}><head><script dangerouslySetInnerHTML={{ __html: themeScript }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/></head><body><LanguageProvider language={language}>{children}</LanguageProvider></body></html>;
}
