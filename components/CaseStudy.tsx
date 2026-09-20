"use client";
import Link from "next/link";
import { usePortfolio } from "./LanguageProvider";
import { caseStudies, projectSlugs, relatedPostSlugs } from "@/lib/case-studies";
import { posts } from "@/lib/editorial";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import ArchitectureDiagram from "./ArchitectureDiagram";
export default function CaseStudy({ slug }: { slug: string }) {
 const { projects, language } = usePortfolio();
 const project = projects[projectSlugs.indexOf(slug)];
 const detail = caseStudies[slug];
 const base = language === "ar" ? "/ar" : "";
 return <><Navbar/><main id="main" className="detail-page"><header id="top" className="section-shell detail-hero hero-enter"><nav className="breadcrumbs" aria-label={language === "ar" ? "مسار التنقل" : "Breadcrumb"}><Link href={base || "/"}>{language === "ar" ? "الرئيسية" : "Home"}</Link><span>/</span><Link href={`${base}/work`}>{language === "ar" ? "المشاريع" : "Projects"}</Link><span>/</span><span aria-current="page">{project.name}</span></nav><p className="eyebrow">{project.status}</p><h1>{detail?.title?.[language] ?? project.name}</h1><p className="detail-intro">{project.description}</p><ul className="tags project-tags">{project.stack.map(tag => <li key={tag}>{tag}</li>)}</ul></header><article className="section-shell case-study-copy">
 {project.architecture && <ArchitectureDiagram/>}
 {detail?.sections.map(([title, paragraph], i) => <Reveal key={i}><section><h2>{title[language]}</h2><p>{paragraph[language]}</p></section></Reveal>)}
 {!detail && project.highlights.map(item => <Reveal key={item.title}><section><h2>{item.title}</h2><p>{item.detail}</p></section></Reveal>)}
 {project.href && <a className="section-link" href={project.href} target="_blank" rel="noreferrer">{language === "ar" ? "زيارة المشروع" : "Visit project"} ↗</a>}
 <section className="related-content"><h2>{language === "ar" ? "مقالات مرتبطة" : "Explore the engineering"}</h2>{relatedPostSlugs(slug).map(id => { const post = posts.find(p => p.slug === id); return post && <Link key={id} href={`${base}/blog/${id}`}>{post.title[language]} →</Link>; })}</section><Link className="section-link" href={`${base}/work`}>{language === "ar" ? "جميع المشاريع" : "All projects"} →</Link>
 </article></main><Footer/></>;
}
