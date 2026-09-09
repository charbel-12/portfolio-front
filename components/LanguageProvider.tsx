"use client";

import { createContext, useContext, type ReactNode } from "react";
import * as english from "@/lib/data";
import { arabic } from "@/lib/arabic";

type Language = "en" | "ar";
const LanguageContext = createContext<{ language: Language } | null>(null);

export default function LanguageProvider({ children, language }: { children: ReactNode; language: Language }) {
  return <LanguageContext.Provider value={{ language }}>{children}</LanguageContext.Provider>;
}

function translate<T,>(value: T): T {
  if (typeof value === "string") return (arabic[value] ?? value) as T;
  if (Array.isArray(value)) return value.map(translate) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translate(item)])) as T;
  return value;
}
const arabicData = translate(english);

export function usePortfolio() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("usePortfolio requires LanguageProvider");
  return { ...context, ...(context.language === "ar" ? arabicData : english), t: (text: string) => context.language === "ar" ? arabic[text] ?? text : text };
}
