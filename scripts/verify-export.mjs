import assert from "node:assert/strict";
import fs from "node:fs";

const root = "out";
const files = fs.readdirSync(root, { recursive: true }).filter(file => file.endsWith(".html") && !/(^|[\\/])(404|_not-found)([\\/]|\.)/.test(file));
const read = path => fs.readFileSync(`${root}/${path}`, "utf8");
const count = (html, className) => [...html.matchAll(new RegExp(`class="${className}"`, "g"))].length;
const attribute = (tag, key) => tag.match(new RegExp(`(?:^|\\s)${key}="([^"]*)"`))?.[1];
let checkedLinks = 0;
const canonicals = new Set();
const alternatesByUrl = new Map();
const normalizeUrl = value => new URL(value).href;
for (const file of files) {
 const html = read(file);
 const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "");
 assert.doesNotMatch(visibleHtml, /\?{3,}|\uFFFD/, `${file}: corrupted visible text`);
 const title = html.match(/<title>(.*?)<\/title>/)?.[1];
 assert.ok(title, `${file}: title`);
 const meta = [...html.matchAll(/<meta\s[^>]*>/g)].map(match => match[0]);
 for (const name of ["description", "twitter:title", "twitter:description", "twitter:image"]) {
  assert.ok(meta.some(tag => attribute(tag, "name") === name && attribute(tag, "content")), `${file}: ${name}`);
 }
 for (const property of ["og:title", "og:description", "og:image", "og:url", "og:locale"]) {
  assert.ok(meta.some(tag => attribute(tag, "property") === property && attribute(tag, "content")), `${file}: ${property}`);
 }
 const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
 assert.ok(head, `${file}: HTML head`);
 const links = [...head.matchAll(/<link\s[^>]*>/g)].map(match => match[0]);
 const canonical = attribute(links.find(tag => attribute(tag, "rel") === "canonical") || "", "href");
 assert.ok(canonical && !canonicals.has(canonical), `${file}: unique canonical`);
 canonicals.add(canonical);
 const origin = new URL(canonical).origin;
 const route = file.replaceAll("\\", "/").replace(/\.html$/, "").replace(/^index$/, "");
 assert.equal(normalizeUrl(canonical), normalizeUrl(origin + "/" + route), `${file}: self-referencing canonical`);
 const englishPath = route.replace(/^ar(?:\/|$)/, "");
 const expected = { en: origin + "/" + englishPath, ar: origin + "/ar" + (englishPath ? "/" + englishPath : ""), "x-default": origin + "/" + englishPath };
 const alternates = {};
 for (const language of ["en", "ar", "x-default"]) {
  const tag = links.find(tag => (attribute(tag, "hrefLang") ?? attribute(tag, "hreflang")) === language);
  assert.ok(tag, `${file}: ${language} alternate in head`);
  alternates[language] = normalizeUrl(attribute(tag, "href"));
  assert.equal(alternates[language], normalizeUrl(expected[language]), `${file}: correct ${language} alternate`);
 }
 alternatesByUrl.set(normalizeUrl(canonical), alternates);
 const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1])["@graph"] || []);
 assert.ok(schemas.some(item => item["@type"] === "Person"), `${file}: person schema`);
 const person = schemas.find(item => item["@type"] === "Person");
 assert.ok(person.sameAs.includes("https://github.com/charbel-12"), `${file}: verified GitHub identity`);
 assert.ok(person.sameAs.includes("https://www.linkedin.com/in/charbel-mdawar-8274781ba"), `${file}: verified LinkedIn identity`);
 if (/(^|[\\/])about\.html$/.test(file)) assert.equal(schemas.find(item => item["@type"] === "ProfilePage")?.mainEntity?.["@id"], person["@id"], `${file}: profile main entity`);
 if (/(^|[\\/])work[\\/]/.test(file)) assert.ok(schemas.some(item => item["@type"] === "BreadcrumbList"), `${file}: project breadcrumbs`);
 const socialUrl = attribute(meta.find(tag => attribute(tag, "property") === "og:image") || "", "content");
 const social = fs.readFileSync(root + new URL(socialUrl).pathname);
 assert.equal(social.readUInt32BE(16), 1200, `${file}: social image width`);
 assert.equal(social.readUInt32BE(20), 630, `${file}: social image height`);
 if (/(^|[\\/])blog[\\/]/.test(file)) {
  const article = schemas.find(item => item["@type"] === "BlogPosting");
  assert.ok(article?.articleBody && article?.author?.name, `${file}: article content and author`);
  assert.equal(article.url, canonical, `${file}: article canonical`);
  assert.ok(schemas.some(item => item["@type"] === "BreadcrumbList"), `${file}: breadcrumbs`);
  if (/^ar[\\/]blog[\\/]/.test(file)) {
   assert.match(visibleHtml, /بواسطة شربل مدور/, `${file}: Arabic author`);
   if (visibleHtml.includes('class="technical-flow"')) assert.match(visibleHtml, /<figcaption>مسار توضيحي<\/figcaption>/, `${file}: Arabic flow caption`);
  }
  const targets = { "centralized-sso-enterprise-applications": "/work/britrip", "payment-integrations-state-transitions": "/work/britrip", "real-time-systems-and-recovery": "/work/callx", "erp-testing-business-rules-data-integrity": "/work/al-ahlam-erp" };
  const slug = file.replaceAll("\\", "/").split("/").at(-1).replace(/\.html$/, "");
  if (targets[slug]) {
   const context = visibleHtml.match(/<p class="article-context">([\s\S]*?)<\/p>/)?.[1];
   assert.ok(context?.includes(`href="${file.startsWith("ar") ? "/ar" : ""}${targets[slug]}"`), `${file}: contextual project link`);
  }
 }
 for (const match of html.matchAll(/href="(\/[^"#?]*)[^\"]*"/g)) {
  const href = decodeURI(match[1]);
  if (href.startsWith("//") || href.startsWith("/_next")) continue;
  assert.ok([root + href, root + href + ".html", root + href + "/index.html"].some(path => fs.existsSync(path)), `${file}: missing ${href}`);
  checkedLinks++;
 }
}
for (const [url, alternates] of alternatesByUrl) {
 for (const language of ["en", "ar"]) assert.deepEqual(alternatesByUrl.get(alternates[language]), alternates, `${url}: reciprocal ${language} alternates`);
}
for (const prefix of ["", "ar/"]) {
 const home = read(prefix ? "ar.html" : "index.html");
 assert.equal(count(home, "project-card"), 2, `${prefix}home: two projects`);
 assert.equal(count(home, "expertise-card"), 3, `${prefix}home: three expertise groups`);
 assert.equal(count(home, "experience-row"), count(read(prefix + "experience.html"), "experience-row"), `${prefix}home: all roles`);
 assert.equal(count(home, "blog-card"), 3, `${prefix}home: three articles`);
 assert.ok(count(read(prefix + "work.html"), "project-card") > 2, `${prefix}work: full projects`);
 assert.equal(count(read(prefix + "blog.html"), "blog-card"), 8, `${prefix}blog: eight articles`);
}
const sitemap = read("sitemap.xml");
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(locations.length, canonicals.size, "sitemap contains every page exactly once");
for (const url of canonicals) assert.ok(locations.includes(url), `sitemap missing ${url}`);
assert.match(read("robots.txt"), /Sitemap: https?:\/\/.*\/sitemap\.xml/);
console.log(`Verified ${files.length} pages, ${checkedLinks} internal links, metadata, schemas, sitemap, and homepage previews.`);
