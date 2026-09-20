import type { Metadata } from "next";
import { profile, education, skillGroups } from "./data";

export const sectionTitles = {
 expertise: { en: "Backend & QA Engineering Expertise | Charbel Mdawar", ar: "خبرات هندسة الخدمات الخلفية وضمان الجودة | شربل مدور" },
 experience: { en: "Software Engineering Experience | Charbel Mdawar", ar: "الخبرة في هندسة البرمجيات | شربل مدور" },
 work: { en: "Software Engineering Projects | Charbel Mdawar", ar: "مشاريع هندسة البرمجيات | شربل مدور" },
 about: { en: "About Charbel Mdawar | Software Engineer", ar: "عن شربل مدور | مهندس برمجيات" },
 blog: { en: "Backend & Quality Engineering Blog | Charbel Mdawar", ar: "مدونة الخدمات الخلفية وهندسة الجودة | شربل مدور" },
 contact: { en: "Contact Charbel Mdawar | Software Engineer", ar: "تواصل مع شربل مدور | مهندس برمجيات" },
};

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://charbelmdawar.com").replace(/\/$/, "");
export const personSchema = { "@type": "Person", "@id": siteUrl + "/#person", name: profile.name, url: siteUrl, image: siteUrl + profile.imageHref, jobTitle: profile.role, sameAs: [profile.linkedin, profile.github].filter(Boolean), alumniOf: { "@type": "CollegeOrUniversity", name: education.school }, knowsAbout: [...new Set(["Java", "Software Quality Assurance", "Application Security", "Performance Testing", ...skillGroups.flatMap(group => group.items)])], knowsLanguage: ["en", "ar"] };
export function pageMetadata(language: "en" | "ar", path: string, title: string, description: string, article = false): Metadata {
 const url = siteUrl + (language === "ar" ? "/ar" : "") + path;
 const image = path.startsWith("/work/") ? `/social/${path.split("/").pop()}.png` : "/social/portfolio.png";
 return {
  metadataBase: new URL(siteUrl), title, description,
  authors: [{ name: "Charbel Mdawar", url: siteUrl + "/about" }],
  robots: { index: true, follow: true },
  alternates: { canonical: url, languages: { en: siteUrl + (path || "/"), ar: siteUrl + "/ar" + path, "x-default": siteUrl + (path || "/") } },
  openGraph: { title, description, url, type: article ? "article" : "website", siteName: "Charbel Mdawar", locale: language === "ar" ? "ar_SY" : "en_US", alternateLocale: [language === "ar" ? "en_US" : "ar_SY"], images: [{ url: image, width: 1200, height: 630, alt: title }], ...(article ? { authors: [siteUrl + "/about"] } : {}) },
  twitter: { card: "summary_large_image", title, description, images: [image] },
 };
}
