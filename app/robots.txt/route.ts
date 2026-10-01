import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
 return new Response(`User-agent: *\nAllow: /\nContent-Signal: ai-train=yes, search=yes, ai-input=yes\n\nSitemap: ${siteUrl}/sitemap.xml\nAgentmap: ${siteUrl}/.well-known/ai-catalog.json\n`, {
  headers: { "Content-Type": "text/plain; charset=utf-8" },
 });
}
