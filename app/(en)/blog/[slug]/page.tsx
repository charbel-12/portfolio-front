import { pageMetadata } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailPage from "@/components/DetailPage";
import { posts } from "@/lib/editorial";
export const dynamicParams = false;
export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
 const { slug } = await params;
 const post = posts.find(item => item.slug === slug);
 if (!post) notFound();
 const title = post.title.en + " | Charbel Mdawar";
 const description = post.summary.en;
 return pageMetadata("en", "/blog/" + slug, title, description, true);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 if (!posts.some(post => post.slug === slug)) notFound();
 return <><PageSchema language="en" section="blog" slug={slug}/><DetailPage section="blog" slug={slug}/></>;
}
