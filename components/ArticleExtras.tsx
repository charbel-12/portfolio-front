"use client";
import Link from "next/link";
import { usePortfolio } from "./LanguageProvider";
import { deepDives } from "@/lib/deep-dives";
import { projectSlugs, relatedPostSlugs } from "@/lib/case-studies";
export default function ArticleExtras({ slug }: { slug: string }) {
 const { language, projects } = usePortfolio();
 const base = language === "ar" ? "/ar" : "";
 const related = projectSlugs.filter(project => relatedPostSlugs(project).includes(slug));
 return <div className="related-content">{deepDives[slug] && <><h2>{language === "ar" ? "مراجع تقنية" : "Technical references"}</h2>{deepDives[slug].references.map(ref => <a key={ref.url} href={ref.url} target="_blank" rel="noreferrer">{ref.title} ↗</a>)}</>}
 <h2>{language === "ar" ? "مشاريع مرتبطة" : "Related project work"}</h2>{related.map(id => <Link key={id} href={`${base}/work/${id}`}>{projects[projectSlugs.indexOf(id)].name} →</Link>)}</div>;
}
