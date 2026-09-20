"use client";
import { usePortfolio } from "./LanguageProvider";
export default function SocialLinks() {
 const { profile, t } = usePortfolio();
 return <nav className="social-links" aria-label={t("Contact")}>
  <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
  <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
  <a href={`mailto:${profile.email}`}>{t("Email")}</a>
  <a href={profile.resumeHref} download>{t("Download CV")}</a>
 </nav>;
}
