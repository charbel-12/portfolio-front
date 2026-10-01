import { pageMetadata, siteUrl, personSchema } from "@/lib/seo";
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import LanguageProvider from "@/components/LanguageProvider";
import AgentTools from "@/components/AgentTools";
const display=Space_Grotesk({subsets:["latin"],weight:["500","600","700"],variable:"--font-display",display:"swap"});
const body=Inter({subsets:["latin"],weight:["400","500","600"],variable:"--font-body",display:"swap"});
const mono=JetBrains_Mono({subsets:["latin"],weight:["400","500"],variable:"--font-mono",display:"swap"});

export const themeScript = `try { var saved = localStorage.getItem('portfolio-theme'); document.documentElement.dataset.theme = saved === 'light' ? 'light' : 'dark'; } catch { document.documentElement.dataset.theme = 'dark'; }`;

export function portfolioMetadata(language: "en" | "ar"): Metadata {
 const isArabic = language === "ar";
 const title = isArabic ? "شربل مدور — مهندس برمجيات" : "Charbel Mdawar — Software Engineer";
 const description = isArabic ? "شربل مدور، مهندس برمجيات متخصص في تطوير الخدمات الخلفية وضمان الجودة. استكشف خبراته في Java وSpring Boot وLaravel والأنظمة اللحظية وقيادة الاختبارات." : "Software engineer specializing in backend development and quality engineering. Explore Java, Spring Boot, Laravel, real-time systems, and QA leadership.";
 return pageMetadata(language, "", title, description);
}

export default function SiteDocument({ children, language }: { children: React.ReactNode; language: "en" | "ar" }) {
 const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", "@id": siteUrl + "/#website", url: siteUrl, name: "Charbel Mdawar", inLanguage: ["en", "ar"] }, personSchema] };
 return <html lang={language} dir={language === "ar" ? "rtl" : "ltr"} suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}><head><link rel="api-catalog" href="/.well-known/api-catalog"/><link rel="ai-catalog" href="/.well-known/ai-catalog.json"/><script dangerouslySetInnerHTML={{ __html: themeScript }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/></head><body><AgentTools/><LanguageProvider language={language}>{children}</LanguageProvider></body></html>;
}
