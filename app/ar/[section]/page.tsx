import { pageMetadata, sectionTitles } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailPage from "@/components/DetailPage";
import { sections, type SectionKey } from "@/lib/editorial";
const keys = [...Object.keys(sections), "blog"];
export const dynamicParams = false;
export function generateStaticParams() { return keys.map(section => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
 const { section } = await params;
 if (!keys.includes(section)) notFound();
 const data = sections[section as SectionKey];
 const title = sectionTitles[section as keyof typeof sectionTitles].ar;
 const description = data?.intro.ar ?? "مقالات عن هندسة البرمجيات والجودة.";
 return pageMetadata("ar", "/" + section, title, description);
}
export default async function Page({ params }: { params: Promise<{ section: string }> }) {
 const { section } = await params;
 if (!keys.includes(section)) notFound();
 return <><PageSchema language="ar" section={section as SectionKey | "blog"}/><DetailPage section={section as SectionKey | "blog"}/></>;
}
