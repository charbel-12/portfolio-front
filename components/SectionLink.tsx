"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "./LanguageProvider";
import { type SectionKey } from "@/lib/editorial";
const labels = {
 work: { en: "See all projects", ar: "عرض جميع المشاريع" },
 expertise: { en: "See all expertise", ar: "عرض جميع الخبرات التقنية" },
 experience: { en: "See full experience", ar: "عرض الخبرة المهنية كاملة" },
 about: { en: "More about me", ar: "المزيد عني" },
 contact: { en: "Visit contact page", ar: "زيارة صفحة التواصل" },
};
export default function SectionLink({ section }: { section: SectionKey }) {
 const { language } = usePortfolio();
 return <Link className="section-link" href={`${language === "ar" ? "/ar" : ""}/${section}`}>{labels[section][language]}<ArrowUpRight size={17} aria-hidden="true"/></Link>;
}
