"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { usePortfolio } from "./LanguageProvider";

export default function ThemeToggle() {
  const { language } = usePortfolio();
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("portfolio-theme"); } catch {}
      const next = saved === "dark" || saved === "light" ? saved : media.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => { media.removeEventListener("change", sync); window.removeEventListener("storage", sync); };
  }, []);
  const label = language === "ar" ? (theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن") : `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  return <button type="button" className="theme-toggle" aria-label={label} title={label} onClick={() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch {}
  }}><Sun className="theme-sun" size={18} aria-hidden="true"/><Moon className="theme-moon" size={18} aria-hidden="true"/></button>;
}
