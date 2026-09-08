"use client";
import { usePortfolio } from "./LanguageProvider";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import Reveal from "./Reveal";
export default function Contact() {
 const { profile, t } = usePortfolio();
 return <section id="contact" className="section-shell section-space"><Reveal><div className="contact-panel"><p className="eyebrow">{t("05 / Get in touch")}</p><h2>{t("Good software starts")}<br/>{t("with a")}{" "}<span className="text-signal">{t("conversation.")}</span></h2><p>{t("Have a project, an engineering challenge, or a role in mind? Let’s connect.")}</p><a className="contact-email" href={`mailto:${profile.email}`}><Mail size={20}/><span dir="ltr">{profile.email}</span><ArrowUpRight size={22}/></a><div className="contact-links"><a href={`tel:${profile.phone.replace(/\s/g,"")}`}><Phone size={15}/><bdi dir="ltr">{profile.phone}</bdi></a><a href={profile.resumeHref} download="Charbel_Mdawar.pdf" type="application/pdf"><Download size={15}/>{t("Download CV")}{" "}<span className="file-type">{t("PDF")}</span></a>{profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><Github size={15}/>{t("GitHub")}</a>}{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15}/>{t("LinkedIn")}</a>}</div><p className="references-note">{t("References available on request.")}</p></div></Reveal></section>;
}
