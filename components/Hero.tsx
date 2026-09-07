import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { hero, profile } from "@/lib/data";
export default function Hero() {
  return <section id="top" className="hero section-shell">
    <div className="hero-kicker hero-enter"><span className="status-dot" /> {profile.role} · {profile.location}</div>
    <p className="hero-name hero-enter" style={{animationDelay:"70ms"}}>{profile.name}</p>
    <h1 className="hero-enter" style={{animationDelay:"140ms"}}>{hero.headline}<br /><span>{hero.accent}</span></h1>
    <div className="hero-bottom hero-enter" style={{animationDelay:"210ms"}}>
      <p>{profile.summary}</p>
      <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17}/></a><a className="button button-secondary" href={profile.resumeHref} download>Download CV <Download size={16}/><span className="file-type">DOCX</span></a></div>
    </div>
    <div className="hero-foot hero-enter" style={{animationDelay:"280ms"}}><span>{hero.specialties.map((item,i)=><span className="specialty" key={item}>{i>0&&<i/>}{item}</span>)}</span><a href="#skills" aria-label="Explore expertise"><ArrowDown size={18}/></a></div>
  </section>;
}
