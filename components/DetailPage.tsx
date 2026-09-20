"use client";
import ArticleContext from "./ArticleContext";
import ArticleExtras from "./ArticleExtras";
import TechnicalFlow from "./TechnicalFlow";
import { deepDives } from "@/lib/deep-dives";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import Blog from "./Blog";
import { usePortfolio } from "./LanguageProvider";
import { sections, posts, type SectionKey } from "@/lib/editorial";
const content = { expertise: Skills, experience: Experience, work: Projects, about: About, contact: Contact };
export default function DetailPage({ section, slug }: { section: SectionKey | "blog"; slug?: string }) {
 const { language } = usePortfolio();
 const base = language === "ar" ? "/ar" : "";
 const post = slug ? posts.find(item => item.slug === slug) : undefined;
 const data = section === "blog" ? undefined : sections[section];
 const title = post?.title[language] ?? data?.title[language] ?? (language === "ar" ? "المدونة" : "The blog");
 const description = post?.summary[language] ?? data?.intro[language] ?? (language === "ar" ? "ملاحظات عن بناء البرمجيات واختبارها وتحسين موثوقيتها." : "Notes on building, testing, and making software more dependable.");
 const Content = section === "blog" ? Blog : content[section];
 return <><Navbar/><main id="main" className="detail-page"><header id="top" className="section-shell detail-hero hero-enter"><nav className="breadcrumbs" aria-label={language === "ar" ? "مسار التنقل" : "Breadcrumb"}><Link href={base || "/"}>{language === "ar" ? "الرئيسية" : "Home"}</Link><span>/</span>{post && <><Link href={`${base}/blog`}>{language === "ar" ? "المدونة" : "Blog"}</Link><span>/</span></>}<span aria-current="page">{title}</span></nav><p className="eyebrow">{post ? post.category[language] : "CHARBEL MDAWAR / " + (language === "ar" ? "الملف المهني" : "PORTFOLIO")}</p><h1>{title}</h1><p className="detail-intro">{description}</p></header>
 {post ? <article className="section-shell article-layout"><aside className="article-toc"><p className="eyebrow">{language === "ar" ? "في هذا المقال" : "In this article"}</p>{post.body.map(([heading], i) => <a key={i} href={`#part-${i}`}>{heading[language]}</a>)}</aside><div className="article-copy"><p className="article-byline"><Link href={`${base}/about`}>{language === "ar" ? "بواسطة شربل مدور" : "By Charbel Mdawar"}</Link></p>{deepDives[post.slug] && <TechnicalFlow labels={deepDives[post.slug].flow.map(label => label[language])} caption={language === "ar" ? "مسار توضيحي" : "Conceptual flow"}/>}{post.body.map(([heading, paragraph], i) => <Reveal key={i}><section id={`part-${i}`}><h2>{heading[language]}</h2><p>{paragraph[language]}</p>{i === 0 && <ArticleContext slug={post.slug} language={language}/>}</section></Reveal>)}<ArticleExtras slug={post.slug}/><Link className="section-link" href={`${base}/blog`}>{language === "ar" ? "العودة إلى المقالات" : "Back to all articles"} →</Link></div></article> : <>{data && <section className="section-shell detail-context" aria-label={language === "ar" ? "نظرة أعمق" : "A closer look"}>{data.details.map(([heading, paragraph], i) => <Reveal key={i} delay={i * 70}><article className="detail-card"><span className="eyebrow">0{i + 1}</span><h2>{heading[language]}</h2><p>{paragraph[language]}</p></article></Reveal>)}</section>}<Content/></>}
 <nav className="section-shell page-directory" aria-label={language === "ar" ? "اكتشف الصفحات" : "Explore pages"}>{Object.entries(sections).filter(([key]) => key !== section).map(([key, value]) => <Link key={key} href={`${base}/${key}`}>{value.title[language]} ↗</Link>)}{section !== "blog" && <Link href={`${base}/blog`}>{language === "ar" ? "المدونة" : "Blog"} ↗</Link>}</nav></main><Footer/></>;
}
