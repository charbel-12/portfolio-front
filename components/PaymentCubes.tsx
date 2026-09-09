"use client";

import { useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { usePortfolio } from "./LanguageProvider";

const providers = [
  { name: "Network International", logo: "/logo_resize.svg", href: "https://www.network.ae/en", theme: "network" },
  { name: "Stripe", logo: "/Stripe-l9ogo.webp", href: "https://stripe.com/", theme: "stripe" },
  { name: "Cryptomus", logo: "/cryptomus.webp", href: "https://cryptomus.com/", theme: "cryptomus" },
];
const faces = ["front", "back", "right", "left", "top", "bottom"];

export default function PaymentCubes() {
  const { t } = usePortfolio();
  const [paused, setPaused] = useState(false);
  return <div className={`payment-showcase${paused ? " is-paused" : ""}`}>
    <div className="payment-heading">
      <p className="eyebrow">{t("Integrated payment providers")}</p>
      <button type="button" className="payment-motion-toggle" onClick={() => setPaused(current => !current)} aria-pressed={paused}>
        {paused ? <Play size={13} aria-hidden="true"/> : <Pause size={13} aria-hidden="true"/>}
        {t(paused ? "Resume animation" : "Pause animation")}
      </button>
    </div>
    <ul className="payment-providers">{providers.map(provider => <li key={provider.name} className={`payment-provider ${provider.theme}`}>
      <a href={provider.href} target="_blank" rel="noreferrer" aria-label={`${t("Visit")} ${provider.name}`}>
        <span className="payment-stage" aria-hidden="true"><span className="payment-float"><span className="payment-cube" dir="ltr">
          {faces.map(face => <span key={face} className={`cube-face cube-${face}`}><img className="cube-logo" src={provider.logo} alt="" width={100} height={40} loading="lazy"/></span>)}
        </span></span><span className="cube-shadow"/></span>
        <span className="payment-provider-name"><bdi>{provider.name}</bdi><ArrowUpRight size={13} aria-hidden="true"/></span>
      </a>
    </li>)}</ul>
  </div>;
}
