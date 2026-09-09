"use client";
import CompanyShapes from "./CompanyShapes";
import { usePortfolio } from "./LanguageProvider";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
export default function Hero() {
 const { hero, profile, t } = usePortfolio();
  const [imageFailed, setImageFailed] = useState(false);
  const [drops, setDrops] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const lastDrop = useRef(0);
  const nextId = useRef(0);
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    event.currentTarget.style.setProperty("--pointer-x", x + "px");
    event.currentTarget.style.setProperty("--pointer-y", y + "px");
    const now = performance.now();
    if (now - lastDrop.current < 130) return;
    lastDrop.current = now;
    const id = nextId.current++;
    const snippets = ["{ }", "</>", "GET /api", "200 OK", "await", "=>", "true", "ship();"];
    setDrops(current => [...current.slice(-11), { id, x, y, text: snippets[id % snippets.length] }]);
  }
  return <section id="top" className="hero section-shell" onPointerMove={handlePointerMove} onPointerLeave={() => setDrops([])}>
    <div className="code-drop" aria-hidden="true">{drops.map(drop => <span key={drop.id} style={{ left: drop.x, top: drop.y }} onAnimationEnd={() => setDrops(current => current.filter(item => item.id !== drop.id))}>{drop.text}</span>)}</div>
    <div className="hero-identity">
      <div className="hero-portrait">{imageFailed ? <span aria-hidden="true">{t("CM")}</span> : <img src={profile.imageHref} alt={t("Charbel Mdawar")} width={1920} height={2560} fetchPriority="high" onError={() => setImageFailed(true)} />}</div>
    <div className="hero-kicker hero-enter"><span className="status-dot" /> {profile.role} · {profile.location}</div>
    <p className="hero-name hero-enter" style={{animationDelay:"70ms"}}>{profile.name}</p>
    </div>
    <h1 className="hero-enter" style={{animationDelay:"140ms"}}>{hero.headline}<br /><span>{hero.accent}</span></h1>
    <div className="hero-bottom hero-enter" style={{animationDelay:"210ms"}}>
      <p>{profile.summary}</p>
      <div className="hero-actions"><a className="button button-primary" href="#work">{t("Explore my work")}{" "}<ArrowUpRight size={17}/></a><a className="button button-secondary" href={profile.resumeHref} download="Charbel_Mdawar.pdf" type="application/pdf">{t("Download CV")}{" "}<Download size={16}/><span className="file-type">{t("PDF")}</span></a></div>
    </div>
    <CompanyShapes/>
    <div className="hero-foot hero-enter" style={{animationDelay:"280ms"}}><span>{hero.specialties.map((item,i)=><span className="specialty" key={item}>{i>0&&<i/>}{item}</span>)}</span><a href="#skills" aria-label={t("Explore expertise")}><ArrowDown size={18}/></a></div>
  </section>;
}
