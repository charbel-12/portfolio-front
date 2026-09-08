"use client";
import { usePortfolio } from "./LanguageProvider";
import Reveal from "./Reveal";
export default function About() {
 const { about, education, languages, volunteering, t } = usePortfolio();
 return <section id="about" className="section-shell section-space"><Reveal><div className="about-grid"><div><p className="eyebrow">{t("04 / About me")}</p><h2>{t("Curiosity in the code.")}<br/><span className="text-muted">{t("Care in the details.")}</span></h2></div><div className="about-copy">{about.map(text=><p key={text}>{text}</p>)}</div></div><dl className="about-facts"><div><dt>{t("Education")}</dt><dd>{education.degree}<span>{education.school} · {education.period}</span></dd></div><div><dt>{t("Languages")}</dt><dd>{languages.join(" / ")}</dd></div><div><dt>{t("Community")}</dt><dd>{volunteering.role}, {volunteering.organization}<span>{volunteering.period}</span></dd></div></dl></Reveal></section>;
}
