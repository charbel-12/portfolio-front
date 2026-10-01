import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import ts from "typescript";

const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://charbelmdawar.com").replace(/\/$/, "");
const domain = new URL(site).hostname;
async function loadData(path) {
 const source = await fs.readFile(path, "utf8");
 const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}
async function write(path, data) {
 await fs.mkdir(`public/${path.substring(0, path.lastIndexOf("/")) || "."}`, { recursive: true });
 await fs.writeFile(`public/${path}`, typeof data === "string" ? data : JSON.stringify(data, null, 2) + "\n");
}
const { profile, projects, experience, skillGroups } = await loadData("lib/data.ts");
const { projectSlugs } = await loadData("lib/case-studies.ts");
await write("api/portfolio.json", {
 profile, experience, skillGroups,
 projects: projects.map((project, i) => ({ ...project, url: `${site}/work/${projectSlugs[i]}` })),
});
await write("api/status.json", { status: "ok", description: "Static portfolio export is available. This is not a live backend health check." });
await write("openapi.json", {
 openapi: "3.1.0",
 info: { title: "Charbel Mdawar Public Portfolio API", version: "1.0.0", description: "Read-only, build-time snapshots of public portfolio content. No authentication required." },
 servers: [{ url: site }], security: [],
 paths: Object.fromEntries([
  ["/api/portfolio.json", "getPortfolio", "Read public profile, experience, skills and projects"],
  ["/api/status.json", "getExportStatus", "Check static export availability (not live backend health)"],
 ].map(([path, operationId, summary]) => [path, { get: { operationId, summary, responses: { "200": { description: "Public JSON snapshot", content: { "application/json": { schema: { type: "object" } } } } } } }])),
});
await write("docs/api.md", `# Portfolio API\n\nBase URL: ${site}\n\nPublic, read-only JSON snapshots regenerated with each deployment. No registration, token, or API key is required. Only GET and HEAD are supported by the static host.\n\n- [Portfolio](${site}/api/portfolio.json): profile, experience, skillGroups, and projects with case-study URLs. Content is in English; Arabic pages are linked from the website.\n- [Export status](${site}/api/status.json): static availability marker, not a live service health probe.\n- [OpenAPI 3.1 description](${site}/openapi.json)\n\nRequest any content page with Accept: text/markdown for Markdown on the configured Nginx deployment. Browsers receive HTML by default. JSON endpoints always return JSON.\n\nProject descriptions refer to past work; they do not grant access to those projects' APIs.\n`);
await write(".well-known/api-catalog", { linkset: [{
 anchor: `${site}/api/portfolio.json`,
 "service-desc": [{ href: `${site}/openapi.json`, type: "application/vnd.oai.openapi+json" }],
 "service-doc": [{ href: `${site}/docs/api.md`, type: "text/markdown" }],
 status: [{ href: `${site}/api/status.json`, type: "application/json" }],
}] });
await write("auth.md", `# auth.md\n\n## Audience and access\n\nAgents reading Charbel Mdawar's public portfolio can access pages and the [read-only portfolio API](${site}/docs/api.md) anonymously over HTTPS.\n\nNo registration or provisioning is required. No API keys, bearer tokens, identity assertions, claim URLs, or revocation endpoints are supported. This site does not operate an OAuth authorization server, protected API, or remote MCP server. Do not send credentials.\n\nUse GET ${site}/api/portfolio.json to read the public data. Contact links are for user-initiated communication; reading the portfolio does not authorize contacting anyone.\n`);
const skill = `---\nname: explore-portfolio\ndescription: Find Charbel Mdawar's public engineering experience, projects, articles, and contact details.\n---\n\n# Explore the portfolio\n\n1. Read ${site}/api/portfolio.json for the public profile, experience, skills, and project case-study links.\n2. Follow a case-study URL for evidence and implementation context. Request Accept: text/markdown when a Markdown representation is preferred.\n3. Find articles through ${site}/blog or ${site}/sitemap.xml. Arabic content uses the /ar prefix.\n4. Cite the relevant public page. Distinguish the author's contributions from conceptual examples. Do not infer access to client systems.\n\nThe API is read-only and anonymous; see ${site}/auth.md. Browser agents may use get_portfolio_profile and find_portfolio_projects when WebMCP is available. These tools retrieve public data only.\n`;
await write(".well-known/agent-skills/explore-portfolio/SKILL.md", skill);
await write(".well-known/agent-skills/index.json", {
 $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
 skills: [{ name: "explore-portfolio", type: "skill-md", description: "Find public engineering experience, projects, articles, and contact details.", url: `${site}/.well-known/agent-skills/explore-portfolio/SKILL.md`, digest: `sha256:${createHash("sha256").update(skill).digest("hex")}` }],
});
await write(".well-known/ai-catalog.json", {
 specVersion: "1.0", host: { displayName: "Charbel Mdawar", identifier: `did:web:${domain}` },
 entries: [
  { identifier: `urn:air:${domain}:api:portfolio`, displayName: "Public portfolio API", type: "application/vnd.oai.openapi+json", url: `${site}/openapi.json`, representativeQueries: ["What projects has Charbel Mdawar worked on?", "What backend and quality engineering experience does Charbel have?"] },
  { identifier: `urn:air:${domain}:skill:explore-portfolio`, displayName: "Explore the portfolio", type: "text/markdown", url: `${site}/.well-known/agent-skills/explore-portfolio/SKILL.md`, representativeQueries: ["Find case studies of Charbel's engineering work", "Where can I read Charbel's engineering articles?"] },
 ],
});
console.log("Generated public API, catalogs, authentication guidance, and skill digest.");

