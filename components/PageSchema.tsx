import { siteUrl, personSchema } from "@/lib/seo";
import { posts, sections, type SectionKey } from "@/lib/editorial";

export default function PageSchema({ language, section, slug }: { language: "en" | "ar"; section: SectionKey | "blog"; slug?: string }) {
 const base = siteUrl + (language === "ar" ? "/ar" : "");
 const post = posts.find(item => item.slug === slug);
 const title = post?.title[language] ?? (section === "blog" ? (language === "ar" ? "المدونة" : "Blog") : sections[section].title[language]);
 const url = `${base}/${section}${post ? "/" + post.slug : ""}`;
 const breadcrumbs = [{ "@type": "ListItem", position: 1, name: language === "ar" ? "الرئيسية" : "Home", item: base || siteUrl }];
 if (post) breadcrumbs.push({ "@type": "ListItem", position: 2, name: language === "ar" ? "المدونة" : "Blog", item: base + "/blog" });
 breadcrumbs.push({ "@type": "ListItem", position: breadcrumbs.length + 1, name: title, item: url });
 const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "BreadcrumbList", "@id": url + "#breadcrumbs", itemListElement: breadcrumbs },
  post ? { "@type": "BlogPosting", "@id": url + "#article", url, mainEntityOfPage: url, headline: title, description: post.summary[language], articleSection: post.category[language], inLanguage: language, image: siteUrl + "/social/portfolio.png", author: { "@type": "Person", name: "Charbel Mdawar", url: siteUrl + "/about", "@id": siteUrl + "/#person" }, articleBody: post.body.map(([heading, paragraph]) => `${heading[language]}\n${paragraph[language]}`).join("\n\n") }
   : { "@type": section === "blog" || section === "work" ? "CollectionPage" : section === "about" ? "ProfilePage" : section === "contact" ? "ContactPage" : "WebPage", "@id": url + "#page", url, name: title, inLanguage: language, ...(section === "about" ? { mainEntity: personSchema } : {}), ...(section === "blog" ? { mainEntity: { "@type": "ItemList", itemListElement: posts.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title[language], url: base + "/blog/" + item.slug })) } } : {}) },
 ] };
 return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}/>;
}
