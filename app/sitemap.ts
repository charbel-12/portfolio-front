import type { MetadataRoute } from "next";
import { posts, sections } from "@/lib/editorial";
import { siteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
 const paths = ["", ...Object.keys(sections).map(key => "/" + key), "/blog", ...posts.map(post => "/blog/" + post.slug)];
 return paths.flatMap(path => ["en", "ar"].map(language => ({
  url: siteUrl + (language === "ar" ? "/ar" : "") + path,
  alternates: { languages: { en: siteUrl + (path || "/"), ar: siteUrl + "/ar" + path } },
 })));
}
