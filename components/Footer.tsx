"use client";
import SocialLinks from "./SocialLinks";

import { usePortfolio } from "./LanguageProvider";
import { ArrowUpRight } from "lucide-react";
export default function Footer() {
 const { profile, t } = usePortfolio(); return <footer className="section-shell footer"><p>© {new Date().getFullYear()} {profile.name}</p><span>{profile.location}</span><SocialLinks/><a href="#top">{t("Back to top")}{" "}<ArrowUpRight size={14}/></a></footer>; }

