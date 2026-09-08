"use client";
import { usePortfolio } from "./LanguageProvider";
import Reveal from "./Reveal";
export default function Experience() {
 const { experience, t } = usePortfolio();
 return <section id="experience" className="section-shell section-space">
  <Reveal><div className="section-heading"><p className="eyebrow">{t("02 / Experience")}</p><h2>{t("A foundation in quality.")}<br/><span className="text-muted">{t("A focus on engineering.")}</span></h2></div></Reveal>
   <div className="experience-list">{experience.map(item=><Reveal key={item.role}><article className="experience-row"><div className="experience-meta"><p>{item.company}</p><span>{item.period}</span></div><div><h3>{item.role}</h3><p className="experience-summary">{item.summary}</p><ul className="experience-points">{item.points.map(point=><li key={point}>{point}</li>)}</ul><ul className="tags">{item.stack.map(tag=><li key={tag}>{tag}</li>)}</ul></div></article></Reveal>)}</div>
 </section>;
}
