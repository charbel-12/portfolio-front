"use client";
import { usePortfolio } from "./LanguageProvider";
import { ArrowRight, Radio, Users } from "lucide-react";
export default function ArchitectureDiagram() {
 const { architecture, t } = usePortfolio();
 return <figure className="architecture" aria-labelledby="architecture-caption">
   <figcaption id="architecture-caption">{architecture.caption}</figcaption>
   <div className="architecture-flow">
     <div className="architecture-node"><div><Radio size={17}/><h4>{t("Calling backend")}</h4></div><ul>{architecture.calling.map(item=><li key={item}>{item}</li>)}</ul></div>
     <div className="architecture-contract"><span>{architecture.contract}</span><ArrowRight size={22} aria-hidden="true"/></div>
     <div className="architecture-node"><div><Users size={17}/><h4>{t("Core backend")}</h4></div><ul>{architecture.core.map(item=><li key={item}>{item}</li>)}</ul></div>
   </div>
   <ul className="architecture-infra">{architecture.infrastructure.map(item=><li key={item}>{item}</li>)}</ul>
 </figure>;
}
