"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/editorial";
import { usePortfolio } from "./LanguageProvider";
import Reveal from "./Reveal";
export default function Blog({ preview = false }: { preview?: boolean }) {
 const { language } = usePortfolio();
 const base = language === "ar" ? "/ar" : "";
 return <section id="blog" className="section-shell section-space blog-section">
  {preview && <Reveal><div className="section-heading"><p className="eyebrow">{language === "ar" ? "ملاحظات هندسية" : "Engineering notes"}</p><h2>{language === "ar" ? "أفكار من وراء الكود." : "Thinking behind the code."}</h2><p className="section-intro">{language === "ar" ? "مقالات عن الخدمات الخلفية والجودة والأنظمة الموثوقة." : "Practical perspectives on backend engineering, quality, and dependable systems."}</p></div></Reveal>}
  <div className="blog-grid">{(preview ? posts.slice(0, 3) : posts).map((post, i) => <Reveal key={post.slug} delay={(i % 3) * 80}><Link className="blog-card" href={`${base}/blog/${post.slug}`}><div className="blog-art" aria-hidden="true"><span className="blog-art-number">0{i + 1}</span><span className="blog-art-code">{["{ API }", "[ PASS ]", "↔ SYNC"][i % 3]}</span></div><div className="blog-card-body"><p className="eyebrow">{post.category[language]}</p><h3>{post.title[language]}</h3><p>{post.summary[language]}</p><span className="blog-read">{language === "ar" ? "قراءة المقال" : "Read article"}<ArrowUpRight size={17} aria-hidden="true"/></span></div></Link></Reveal>)}</div>
  {preview && <Link className="section-link" href={`${base}/blog`}>{language === "ar" ? "جميع المقالات" : "All articles"}<ArrowUpRight size={17} aria-hidden="true"/></Link>}
 </section>;
}
