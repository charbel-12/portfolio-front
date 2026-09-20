"use client";
import Link from "next/link";
import { projectSlugs } from "@/lib/case-studies";
import { usePortfolio } from "./LanguageProvider";
import { ArrowUpRight } from "lucide-react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import PaymentCubes from "./PaymentCubes";
import Reveal from "./Reveal";
import SectionLink from "./SectionLink";
export default function Projects({ preview = false }: { preview?: boolean }) {
 const { projects, t, language } = usePortfolio();
  return <section id="work" className="section-shell section-space">
    <Reveal><div className="section-heading"><p className="eyebrow">{t("03 / Selected work")}</p><h2>{t("From architecture")}<br/><span className="text-muted">{t("to application.")}</span></h2><p className="section-intro">{t("Systems I have built and validated, spanning backend engineering, customer platforms, and quality assurance.")}</p></div></Reveal>
    <div className="project-list">{(preview ? projects.slice(0, 2) : projects).map((project,i)=><Reveal key={project.name}><article className="project-card" id={project.payments ? "company-britrip" : undefined} tabIndex={project.payments ? -1 : undefined}>
      <div className="project-top"><span className="project-index">0{i+1}</span><span className={project.architecture ? "project-status active" : "project-status"}>{project.architecture && <span className="status-dot"/>}{project.status}</span></div>
      <div className="project-summary"><div><p className="eyebrow">{project.tagline}</p><h3 className={project.secondary ? "project-secondary-title" : ""}>{project.name}{project.href && <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${t("Visit")} ${project.name}`}><ArrowUpRight aria-hidden="true" size={30}/></a>}</h3></div><p>{project.description}</p></div>
      {!preview && project.architecture && <ArchitectureDiagram/>}
      {!preview && <div className="project-details">{project.highlights.map(item=><div key={item.title}><h4>{item.title}</h4><p>{item.detail}</p></div>)}</div>}
      {!preview && project.payments && <PaymentCubes/>}
      <ul className="tags project-tags">{project.stack.map(item=><li key={item}>{item}</li>)}</ul>
    <Link className="section-link" href={`${language === "ar" ? "/ar" : ""}/work/${projectSlugs[i]}`}>{language === "ar" ? "\u062f\u0631\u0627\u0633\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639" : "Read case study"} <ArrowUpRight size={17}/></Link></article></Reveal>)}</div>{!preview && <p className="projects-note">{t("More project details are included in the downloadable CV.")}</p>}
  <SectionLink section="work"/></section>;
}
