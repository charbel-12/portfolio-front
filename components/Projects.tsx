import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import ArchitectureDiagram from "./ArchitectureDiagram";
import Reveal from "./Reveal";
export default function Projects() {
  return <section id="work" className="section-shell section-space">
    <Reveal><div className="section-heading"><p className="eyebrow">02 / Selected work</p><h2>From architecture<br/><span className="text-muted">to application.</span></h2><p className="section-intro">A closer look at the systems I have been building.</p></div></Reveal>
    <div className="project-list">{projects.map((project,i)=><Reveal key={project.name}><article className="project-card">
      <div className="project-top"><span className="project-index">0{i+1}</span><span className={project.architecture ? "project-status active" : "project-status"}>{project.architecture && <span className="status-dot"/>}{project.status}</span></div>
      <div className="project-summary"><div><p className="eyebrow">{project.tagline}</p><h3>{project.name}<ArrowUpRight aria-hidden="true" size={30}/></h3></div><p>{project.description}</p></div>
      {project.architecture && <ArchitectureDiagram/>}
      <div className="project-details">{project.highlights.map(item=><div key={item.title}><h4>{item.title}</h4><p>{item.detail}</p></div>)}</div>
      <ul className="tags project-tags">{project.stack.map(item=><li key={item}>{item}</li>)}</ul>
    </article></Reveal>)}</div>
  </section>;
}
