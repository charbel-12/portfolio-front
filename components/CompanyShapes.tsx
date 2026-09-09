"use client";

import { useState, type CSSProperties } from "react";
import { ArrowDownRight, Pause, Play } from "lucide-react";
import { usePortfolio } from "./LanguageProvider";

const companies = [
  { name: "IXCoders", logo: "/ixcoders.webp", section: "company-ixcoders", shape: "circle" },
  { name: "Prokoders", logo: "/prokoders.webp", section: "company-prokoders", shape: "diamond" },
  { name: "ECMARKT", logo: "/ECMARKT.svg", section: "company-ecmarkt", shape: "hexagon" },
];

export default function CompanyShapes() {
  const { language, t } = usePortfolio();
  const [paused, setPaused] = useState(false);
  return <div className={`company-constellation${paused ? " is-paused" : ""}`}>
    <button type="button" className="company-motion-toggle payment-motion-toggle" onClick={() => setPaused(current => !current)} aria-pressed={paused}>
      {paused ? <Play size={13} aria-hidden="true"/> : <Pause size={13} aria-hidden="true"/>}{t(paused ? "Resume animation" : "Pause animation")}
    </button>
    <ul className="company-shapes" aria-label={language === "ar" ? "الشركات" : "Companies"}>{companies.map((company, index) => <li key={company.name} style={{ "--float-delay": `${index * -2.3}s` } as CSSProperties}>
      <a className="company-link" href={`#${company.section}`} aria-label={language === "ar" ? `استكشف عملي مع ${company.name}` : `Explore my work with ${company.name}`}>
        <span className={`company-shape shape-${company.shape}`}>
          {Array.from({ length: 9 }, (_, layer) => <span key={layer} aria-hidden="true" className="company-depth" style={{ "--layer": layer } as CSSProperties}/>)}
          <span className="company-face"><img src={company.logo} alt="" width={110} height={48}/></span>
        </span>
        <span className="company-label"><bdi>{company.name}</bdi><ArrowDownRight size={12} aria-hidden="true"/></span>
      </a>
    </li>)}</ul>
  </div>;
}
