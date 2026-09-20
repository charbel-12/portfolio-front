import fs from "node:fs/promises";
import sharp from "sharp";
import ts from "typescript";

async function loadData(path) {
 const source = await fs.readFile(path, "utf8");
 const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}
const { projects } = await loadData("lib/data.ts");
const { projectSlugs } = await loadData("lib/case-studies.ts");
const escape = text => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
function lines(text, limit = 35) {
 const result = [""];
 for (const word of text.split(" ")) {
  if ((result.at(-1) + " " + word).trim().length > limit) result.push(word);
  else result[result.length - 1] = (result.at(-1) + " " + word).trim();
 }
 return result;
}
await fs.mkdir("public/social", { recursive: true });
const cards = [{ slug: "portfolio", name: "Charbel Mdawar", tagline: "Software Engineer", stack: ["Java", "Spring Boot", "Laravel", "Quality Engineering"] }, ...projects.map((project, i) => ({ ...project, slug: projectSlugs[i] }))];
for (const card of cards) {
 const title = lines(card.name);
 const subtitle = lines(card.tagline, 62);
 const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0B0F14"/><rect x="32" y="32" width="1136" height="566" rx="20" fill="#11161D" stroke="#242B35"/><path d="M900 60v500M1000 60v500M1100 60v500M850 130h280M850 230h280M850 330h280M850 430h280" stroke="#3B82F6" opacity=".13"/><circle cx="1020" cy="280" r="105" fill="none" stroke="#3B82F6" opacity=".28"/><text x="80" y="105" font-family="Arial,sans-serif" font-size="20" fill="#3B82F6" letter-spacing="3">CHARBEL MDAWAR / ENGINEERING</text>${title.map((line, i) => `<text x="80" y="${220 + i * 65}" font-family="Arial,sans-serif" font-size="52" font-weight="700" fill="#F5F7FA">${escape(line)}</text>`).join("")}${subtitle.map((line, i) => `<text x="80" y="${230 + title.length * 65 + i * 35}" font-family="Arial,sans-serif" font-size="26" fill="#8B95A5">${escape(line)}</text>`).join("")}<path d="M80 480h1040" stroke="#242B35"/><text x="80" y="525" font-family="Arial,sans-serif" font-size="21" fill="#3B82F6">${escape(card.stack.slice(0, 4).join(" · "))}</text><text x="80" y="565" font-family="Arial,sans-serif" font-size="18" fill="#8B95A5">charbelmdawar.com${card.slug === "portfolio" ? "" : "/work/" + card.slug}</text></svg>`;
 await sharp(Buffer.from(svg)).png().toFile(`public/social/${card.slug}.png`);
}
for (const width of [384, 768]) await sharp("public/charbel-mdawar.jpg").resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/charbel-mdawar-${width}.webp`);
console.log(`Generated ${cards.length} social cards (1200 × 630) and two responsive portraits.`);
