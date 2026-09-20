import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://charbelmdawar.com").replace(/\/$/, "");
export function pageMetadata(language: "en" | "ar", path: string, title: string, description: string, article = false): Metadata {
 const url = siteUrl + (language === "ar" ? "/ar" : "") + path;
 return {
  metadataBase: new URL(siteUrl), title, description,
  authors: [{ name: "Charbel Mdawar", url: siteUrl + "/about" }],
  robots: { index: true, follow: true },
  alternates: { canonical: url, languages: { en: siteUrl + (path || "/"), ar: siteUrl + "/ar" + path, "x-default": siteUrl + (path || "/") } },
  openGraph: { title, description, url, type: article ? "article" : "website", siteName: "Charbel Mdawar", locale: language === "ar" ? "ar_SY" : "en_US", alternateLocale: [language === "ar" ? "en_US" : "ar_SY"], images: [{ url: "/og.png", width: 1730, height: 909, alt: "Charbel Mdawar — Software Engineer" }], ...(article ? { authors: [siteUrl + "/about"] } : {}) },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
 };
}
