"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import { usePortfolio } from "./LanguageProvider";
import LogoModel from "./LogoModel";

const companies = [
  { name: "IXCoders", model: "/ixcoders_3d_badge.glb", fallback: "/ixcoders.png", section: "company-ixcoders" },
  { name: "Prokoders", model: "/prokoders%20logo%203d.glb", fallback: "/prokoders.webp", section: "company-prokoders" },
  { name: "ECMARKT", model: "/ecmarkt_logo_3d.glb", fallback: "/ECMARKT.svg", section: "company-ecmarkt" },
];

export default function CompanyShapes() {
  const { language, t } = usePortfolio();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [readyModels, setReadyModels] = useState<string[]>([]);
  const onModelReady = useCallback((src: string) => {
    setReadyModels(current => current.includes(src) ? current : [...current, src]);
  }, []);
  const revealed = visible && readyModels.length === companies.length;
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const shown = window.scrollY > 8;
      setVisible(shown);
      if (shown) setLoaded(true);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    // Follow the actual headline height, including wrapped Arabic text.
    const hero = root.current?.closest(".hero");
    const heading = hero?.querySelector("h1");
    const position = () => {
      if (hero && heading && root.current) {
        root.current.style.top = `${heading.offsetTop + heading.offsetHeight + 6}px`;
      }
    };
    const observer = new ResizeObserver(position);
    if (hero) observer.observe(hero);
    if (heading) observer.observe(heading);
    position();
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  return <div ref={root} className={`company-constellation${revealed ? " is-visible" : ""}${paused ? " is-paused" : ""}`} aria-hidden={!revealed} inert={!revealed}>
    <button type="button" className="company-motion-toggle payment-motion-toggle" onClick={() => setPaused(current => !current)} aria-pressed={paused}>
      {paused ? <Play size={13} aria-hidden="true"/> : <Pause size={13} aria-hidden="true"/>}{t(paused ? "Resume animation" : "Pause animation")}
    </button>
    <ul className="company-shapes" aria-label={language === "ar" ? "الشركات" : "Companies"}>{companies.map((company, index) => <li key={company.name} style={{ "--float-delay": `${index * -2.3}s`, "--reveal-delay": `${index * 1100}ms` } as CSSProperties}>
      <a className="company-link" href={`#${company.section}`} aria-label={language === "ar" ? `استكشف عملي مع ${company.name}` : `Explore my work with ${company.name}`}>
        {loaded && <LogoModel src={company.model} fallback={company.fallback} paused={paused || !revealed} phase={index * 2.3} onReady={onModelReady}/>}
        <span className="company-label"><bdi>{company.name}</bdi></span>
      </a>
    </li>)}</ul>
  </div>;
}
