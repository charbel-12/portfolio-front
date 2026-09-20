import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { arabic } from "@/lib/arabic";
import { caseStudies, projectSlugs } from "@/lib/case-studies";
import { pageMetadata, siteUrl, personSchema } from "@/lib/seo";
import CaseStudy from "@/components/CaseStudy";
export const dynamicParams = false;
export function generateStaticParams() { return projectSlugs.map(slug => ({ slug })); }
function data(slug: string) { const index = projectSlugs.indexOf(slug); if (index < 0) notFound(); const project = projects[index]; return { project, title: caseStudies[slug]?.title?.en ?? project.name, description: project.description }; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const { title, description } = data(slug); return pageMetadata("en", "/work/" + slug, title + " | Charbel Mdawar", description); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const { title, description } = data(slug); const base = siteUrl + ""; const url = base + "/work/" + slug;
 const schema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": url + "#page", url, name: title, description, inLanguage: "en", about: { "@type": "CreativeWork", name: title, description }, author: { "@id": personSchema["@id"] }, primaryImageOfPage: siteUrl + "/social/" + slug + ".png" }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: base }, { "@type": "ListItem", position: 2, name: "Projects", item: base + "/work" }, { "@type": "ListItem", position: 3, name: title, item: url }] }] };
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}/><CaseStudy slug={slug}/></>;
}
