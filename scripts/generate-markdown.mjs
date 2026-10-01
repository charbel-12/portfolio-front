import fs from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";

const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://charbelmdawar.com").replace(/\/$/, "");
const converter = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
let pageUrl = site;
converter.remove(["script", "style", "svg", "button", "nav", "footer"]);
converter.addRule("absolute-links", {
 filter: "a",
 replacement(content, node) {
  const href = node.getAttribute("href");
  if (!href) return content;
  return `[${content.replace(/\n/g, " ")}](${new URL(href, pageUrl).href})`;
 },
});
const files = (await fs.readdir("out", { recursive: true })).filter(file => file.endsWith(".html") && !/(^|[\\/])(404|_not-found)([\\/]|\.)/.test(file));
const mappings = [];
for (const file of files) {
 const html = await fs.readFile(path.join("out", file), "utf8");
 const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
 if (!main) throw new Error(`No main content in ${file}`);
 const route = file.replaceAll("\\", "/").replace(/\.html$/, "").replace(/^index$/, "");
 pageUrl = `${site}/${route}`;
 const target = path.join("out/_markdown", file.replace(/\.html$/, ".md"));
 await fs.mkdir(path.dirname(target), { recursive: true });
 await fs.writeFile(target, `Source: ${site}/${route}\n\n${converter.turndown(main)}\n`);
 const markdownPath = `/_markdown/${file.replaceAll("\\", "/").replace(/\.html$/, ".md")}`;
 for (const alias of new Set([`/${route}`, `/${route}${route ? "/" : ""}`, `/${file.replaceAll("\\", "/")}`])) {
  mappings.push(`    "1:${alias}" "${markdownPath}";`);
 }
}
await fs.mkdir("deployment/generated", { recursive: true });
await fs.writeFile("deployment/generated/markdown-map.conf", `# Generated with the export; include inside the http context.\nmap "$agent_accept_markdown:$uri" $agent_markdown_file {\n    default "";\n${mappings.join("\n")}\n}\n`);
console.log(`Generated Markdown for ${files.length} pages and an Nginx route map.`);
