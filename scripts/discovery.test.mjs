import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const read = path => fs.readFileSync(`out/${path}`, "utf8");
const json = path => JSON.parse(read(path));
const exists = url => {
 const path = new URL(url, "https://charbelmdawar.com").pathname;
 assert.ok([`out${path}`, `out${path}.html`, `out${path}/index.html`].some(p => fs.existsSync(p)), `Missing resource ${url}`);
};

test("catalog advertises actual public API, documentation and availability marker", () => {
 const { linkset } = json(".well-known/api-catalog");
 assert.equal(linkset.length, 1);
 for (const entry of linkset) {
  exists(entry.anchor);
  for (const rel of ["service-desc", "service-doc", "status"]) entry[rel].forEach(link => exists(link.href));
 }
 const api = json("api/portfolio.json");
 assert.equal(api.profile.name, "Charbel Mdawar");
 assert.ok(api.projects.length > 2);
 api.projects.forEach(project => exists(project.url));
 const schema = json("openapi.json");
 Object.keys(schema.paths).forEach(exists);
 assert.deepEqual(schema.security, []);
});

test("skill digest matches exact published UTF-8 bytes and ARD targets resolve", () => {
 const index = json(".well-known/agent-skills/index.json");
 assert.equal(index.$schema, "https://schemas.agentskills.io/discovery/0.2.0/schema.json");
 for (const skill of index.skills) {
  const bytes = fs.readFileSync(`out${new URL(skill.url).pathname}`);
  assert.equal(skill.digest, `sha256:${createHash("sha256").update(bytes).digest("hex")}`);
 }
 const catalog = json(".well-known/ai-catalog.json");
 assert.ok(catalog.specVersion && catalog.host.identifier);
 for (const entry of catalog.entries) {
  assert.equal(Number("url" in entry) + Number("data" in entry), 1);
  assert.match(entry.identifier, /^urn:air:[^:]+:[^:]+:[^:]+$/);
  assert.ok(entry.representativeQueries.length >= 2 && entry.representativeQueries.length <= 5);
  if (entry.url) exists(entry.url);
 }
});

test("every content page has Markdown and an Nginx mapping, including Arabic", () => {
 const files = fs.readdirSync("out", { recursive: true }).filter(file => file.endsWith(".html") && !/(^|[\\/])(404|_not-found)([\\/]|\.)/.test(file));
 const config = fs.readFileSync("deployment/generated/markdown-map.conf", "utf8");
 for (const file of files) {
  const target = file.replaceAll("\\", "/").replace(/\.html$/, ".md");
  const markdown = read(`_markdown/${target}`);
  assert.ok(markdown.length > 200, target);
  assert.doesNotMatch(markdown, /<script|self\.__next|<svg/);
  assert.ok(config.includes(`"/_markdown/${target}"`), target);
 }
 assert.match(read("_markdown/ar.md"), /[\u0600-\u06ff]/);
 assert.match(read("robots.txt"), /Content-Signal: ai-train=yes, search=yes, ai-input=(yes|no)/);
 assert.match(read("auth.md"), /^# auth.md/);
 for (const absent of [".well-known/oauth-authorization-server", ".well-known/openid-configuration", ".well-known/oauth-protected-resource", ".well-known/mcp/server-card.json"]) assert.ok(!fs.existsSync(`out/${absent}`));
});

test("Nginx Accept rules opt in explicitly and respect q=0", () => {
 const config = fs.readFileSync("deployment/nginx-agent-http.conf", "utf8");
 const rules = [...config.matchAll(/"~\*(.*?)" ([01]);/g)].map(([, regex, value]) => [new RegExp(regex, "i"), Number(value)]);
 const accepts = value => rules.find(([regex]) => regex.test(value))?.[1] ?? 0;
 for (const value of ["text/markdown", "text/markdown; q=0.5", "text/html, TEXT/MARKDOWN", "text/markdown; charset=utf-8"]) assert.equal(accepts(value), 1, value);
 for (const value of ["", "*/*", "text/html", "text/markdown;q=0", "text/markdown; q=0.000, text/html", "text/markdown;q=0; charset=utf-8", "application/json"]) assert.equal(accepts(value), 0, value);
});

test("WebMCP tools retrieve public data, validate input, and unregister on cleanup", async () => {
 const source = fs.readFileSync("components/AgentTools.tsx", "utf8");
 const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
 const portfolio = json("api/portfolio.json");
 for (const legacy of [false, true]) {
  const tools = new Map();
  const signals = [];
  let cleanup;
  const context = {
   registerTool(tool, { signal }) { tools.set(tool.name, tool); signals.push(signal); return Promise.resolve(); },
   unregisterTool(name) { tools.delete(name); },
  };
  const sandbox = {
   exports: {}, AbortController, URL, console,
   document: legacy ? {} : { modelContext: context },
   navigator: legacy ? { modelContext: context } : {},
   location: { origin: "https://charbelmdawar.com" },
   require(name) {
    if (name === "react") return { useEffect: fn => { cleanup = fn(); } };
    if (name === "@/lib/data") return portfolio;
    if (name === "@/lib/case-studies") return { projectSlugs: portfolio.projects.map(p => new URL(p.url).pathname.split("/").at(-1)) };
    throw new Error(`Unexpected import ${name}`);
   },
  };
  vm.runInNewContext(compiled, sandbox);
  sandbox.exports.default();
  assert.equal(tools.size, 2);
  assert.equal((await tools.get("get_portfolio_profile").execute({})).name, "Charbel Mdawar");
  const search = tools.get("find_portfolio_projects").execute;
  assert.ok((await search({ query: "spring boot" })).some(p => p.name === "CallX"));
  assert.equal((await search({ query: "no-matching-project-xyz" })).length, 0);
  await assert.rejects(search({ query: 123 }), /query must be/);
  cleanup();
  assert.equal(tools.size, 0);
  assert.ok(signals.every(signal => signal.aborted));
 }
});
