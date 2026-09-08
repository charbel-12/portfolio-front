"use client";
import { usePortfolio } from "./LanguageProvider";
import { Code2, Fingerprint, FlaskConical, ShieldCheck, Database, Terminal } from "lucide-react";
import Reveal from "./Reveal";
const icons = [Code2, Fingerprint, FlaskConical, ShieldCheck, Database, Terminal];
export default function Skills() {
 const { skillGroups, t } = usePortfolio();
  return <section id="skills" className="section-shell section-space">
    <Reveal><div className="section-heading"><p className="eyebrow">{t("01 / Expertise")}</p><h2>{t("Built well.")}<br/><span className="text-muted">{t("Tested thoroughly.")}</span></h2><p className="section-intro">{t("Engineering and quality are part of the same process. Here is the toolkit I bring to both.")}</p></div></Reveal>
    <div className="expertise-grid">{skillGroups.map((group,i)=>{const Icon=icons[i]; return <Reveal key={group.label} delay={(i%3)*70}><article className="expertise-card"><Icon size={22} strokeWidth={1.5} className="text-signal"/><h3>{group.label}</h3><p>{group.description}</p><ul className="tags">{group.items.map(item=><li key={item}>{item}</li>)}</ul></article></Reveal>})}</div>
  </section>;
}
