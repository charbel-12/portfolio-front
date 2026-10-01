import assert from "node:assert/strict";

const base = process.argv[2];
if (!base) throw new Error("Usage: node scripts/verify-agent-http.mjs https://charbelmdawar.com");
async function check(path, accept, type, method = "GET") {
 const response = await fetch(new URL(path, base), { method, headers: accept ? { Accept: accept } : {}, redirect: "error" });
 assert.equal(response.status, 200, `${method} ${path}`);
 assert.ok(response.headers.get("Content-Type")?.startsWith(type), `${path}: ${response.headers.get("Content-Type")}`);
 return response;
}
for (const path of ["/", "/ar", "/work/callx", "/ar/blog/centralized-sso-enterprise-applications"]) {
 const md = await check(path, "text/markdown", "text/markdown");
 assert.match(md.headers.get("Vary") || "", /accept/i);
 assert.ok((await md.text()).length > 200);
 await check(path, "text/markdown", "text/markdown", "HEAD");
 await check(path, "text/markdown;q=0, text/html", "text/html");
 const html = await check(path, "text/html", "text/html");
 if (path === "/") assert.match(html.headers.get("Link") || "", /rel="api-catalog"/);
}
await check("/.well-known/api-catalog", null, "application/linkset+json");
const ard = await check("/.well-known/ai-catalog.json", null, "application/json");
assert.equal(ard.headers.get("Access-Control-Allow-Origin"), "*");
await check("/auth.md", null, "text/markdown");
await check("/.well-known/agent-skills/index.json", null, "application/json");
const missing = await fetch(new URL("/__missing_agent_test__", base), { headers: { Accept: "text/markdown" } });
assert.equal(missing.status, 404);
console.log("Verified HTTP negotiation, HEAD, browser defaults, catalogs, CORS, and 404 behavior.");
