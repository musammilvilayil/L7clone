/**
 * Static prerender (post-build).
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server). For every
 * route in src/routes.ts it renders the real React tree with
 * react-dom/static, injects the page's <head> tags (title, description,
 * canonical, Open Graph, Twitter, robots, JSON-LD) plus modulepreload and
 * stylesheet links for exactly the chunks that page needs, and writes
 * dist/client/<route>/index.html. It also writes 404.html, sitemap.xml and
 * robots.txt, then Brotli/Gzip-compresses every text asset.
 *
 * Unlike a headless-browser snapshot (Whiteline's prerender.mjs), no browser
 * is needed and the output hydrates instead of re-rendering.
 */
import { brotliCompressSync, gzipSync, constants } from "node:zlib";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const client = join(root, "dist", "client");
const serverEntry = join(root, "dist", "server", "entry-server.js");

for (const required of [join(client, "index.html"), join(client, ".vite", "manifest.json"), serverEntry]) {
  if (!existsSync(required)) {
    console.error(`prerender: missing ${required} — run the client and server builds first.`);
    process.exit(1);
  }
}

// Keep the untouched Vite shell so the script can be re-run (index.html is
// overwritten by the prerendered home page below).
const templateBackup = join(client, ".vite", "index.template.html");
const shell = readFileSync(join(client, "index.html"), "utf8");
if (shell.includes("<!--app-html-->")) writeFileSync(templateBackup, shell);
const template = readFileSync(templateBackup, "utf8");
const manifest = JSON.parse(readFileSync(join(client, ".vite", "manifest.json"), "utf8"));
const server = await import(pathToFileURL(serverEntry).href);
const { render, ROUTES, PAGE_SEO, buildSitemap, buildRobots, SITE_URL, ALLOW_INDEXING } = server;

/** Source module of each page (keys of the Vite manifest). */
const PAGE_MODULES = {
  home: "src/pages/Home/HomePage.tsx",
  services: "src/pages/Services/ServicesPage.tsx",
  about: "src/pages/About/AboutPage.tsx",
  contact: "src/pages/Contact/ContactPage.tsx",
  education: "src/pages/Education/EducationPage.tsx",
  faq: "src/pages/Faq/FaqPage.tsx",
  careers: "src/pages/Careers/CareersPage.tsx",
  portfolio: "src/pages/Portfolio/PortfolioPage.tsx",
  serviceAemDigitalExperience: "src/pages/ServiceDetail/AemDigitalExperiencePage.tsx",
  serviceAnalyticsExperimentation: "src/pages/ServiceDetail/AnalyticsExperimentationPage.tsx",
  serviceHeadlessCms: "src/pages/ServiceDetail/HeadlessCmsPage.tsx",
  serviceWebExperience: "src/pages/ServiceDetail/WebExperiencePage.tsx",
  serviceLocalizationUiux: "src/pages/ServiceDetail/LocalizationUiuxPage.tsx",
  serviceAiAssistant: "src/pages/ServiceDetail/AiAssistantPage.tsx",
  serviceAgenticAi: "src/pages/ServiceDetail/AgenticAiPage.tsx",
  serviceIntelligentWebsites: "src/pages/ServiceDetail/IntelligentWebsitesPage.tsx",
  serviceAiProduct: "src/pages/ServiceDetail/AiProductPage.tsx",
  serviceHyperautomation: "src/pages/ServiceDetail/HyperautomationPage.tsx",
  serviceTechnology: "src/pages/ServiceDetail/TechnologyConsultingPage.tsx",
  serviceSkilledResource: "src/pages/ServiceDetail/SkilledResourcePage.tsx",
  serviceGreenRecovery: "src/pages/ServiceDetail/GreenRecoveryPage.tsx",
  serviceProductSolution: "src/pages/ServiceDetail/ProductSolutionPage.tsx",
  notFound: "src/pages/NotFound/NotFoundPage.tsx",
};

// ── Drift guard ──────────────────────────────────────────────────────────────
const problems = [];
for (const route of ROUTES) {
  if (!PAGE_SEO[route.page]) problems.push(`route ${route.path} has no PAGE_SEO entry`);
  if (!PAGE_MODULES[route.page]) problems.push(`route ${route.path} has no PAGE_MODULES entry in prerender.mjs`);
  else if (!manifest[PAGE_MODULES[route.page]]) problems.push(`${PAGE_MODULES[route.page]} is not in the Vite manifest`);
}
if (problems.length) {
  console.error("prerender: route data is inconsistent —");
  problems.forEach((p) => console.error(`  • ${p}`));
  process.exit(1);
}

// ── Chunk resolution ─────────────────────────────────────────────────────────
const entryKey = Object.keys(manifest).find((key) => manifest[key].isEntry);
const entryFiles = new Set();
const entryCss = new Set();
(function collectEntry(key) {
  const chunk = manifest[key];
  if (!chunk || entryFiles.has(chunk.file)) return;
  entryFiles.add(chunk.file);
  (chunk.css ?? []).forEach((css) => entryCss.add(css));
  (chunk.imports ?? []).forEach(collectEntry);
})(entryKey);

/** JS + CSS needed by a page chunk, excluding what the entry already loads. */
function assetsFor(moduleKey) {
  const js = new Set();
  const css = new Set();
  const seen = new Set();
  (function walk(key) {
    if (seen.has(key)) return;
    seen.add(key);
    const chunk = manifest[key];
    if (!chunk) return;
    if (!entryFiles.has(chunk.file)) js.add(chunk.file);
    (chunk.css ?? []).forEach((file) => !entryCss.has(file) && css.add(file));
    (chunk.imports ?? []).forEach(walk);
  })(moduleKey);
  return { js: [...js], css: [...css] };
}

/**
 * Inline each page's CSS (global + page chunks) into its HTML so first paint
 * needs no extra round trip (Lighthouse "render-blocking requests"). The page
 * CSS files are still referenced with media="not all": that low-priority,
 * non-blocking link tells Vite's lazy-chunk loader the stylesheet is already
 * present (no duplicate injection) and warms the cache for later navigations.
 * Set PRERENDER_INLINE_CSS=false to use plain <link rel="stylesheet"> tags.
 */
const INLINE_CSS = process.env.PRERENDER_INLINE_CSS !== "false";
const cssText = (file) => readFileSync(join(client, file), "utf8").replace(/<\/style/gi, "<\\/style");

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function buildDocument({ appHtml, headHtml }, pageKey) {
  const { js, css } = assetsFor(PAGE_MODULES[pageKey]);
  let shell = template;
  const links = [];

  // Vite appends the global stylesheet at the end of <head>. Remove it there
  // and emit it BEFORE the page stylesheets, so component CSS overrides the
  // design system the same way it does after client-side navigation.
  for (const file of entryCss) {
    const tag = new RegExp(`\\s*<link rel="stylesheet"[^>]*href="/${escapeRe(file)}"[^>]*>`);
    if (!tag.test(shell)) throw new Error(`entry stylesheet ${file} not found in index.html`);
    shell = shell.replace(tag, "");
    links.push(INLINE_CSS ? `<style data-href="/${file}">${cssText(file)}</style>` : `<link rel="stylesheet" crossorigin href="/${file}">`);
  }

  if (INLINE_CSS) {
    for (const file of css) {
      links.push(`<style data-href="/${file}">${cssText(file)}</style>`);
      links.push(`<link rel="stylesheet" crossorigin href="/${file}" media="not all">`);
    }
  } else {
    links.push(...css.map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`));
  }
  links.push(...js.map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`));

  const head = [headHtml, ...links].join("\n    ");
  if (!shell.includes("<!--app-head-->") || !shell.includes("<!--app-html-->")) {
    throw new Error("index.html is missing <!--app-head--> or <!--app-html-->");
  }
  return shell.replace("<!--app-head-->", head).replace("<!--app-html-->", appHtml);
}

// ── Render ───────────────────────────────────────────────────────────────────
const written = [];
for (const route of ROUTES) {
  const result = await render(route.path);
  if (result.page !== route.page) throw new Error(`${route.path} rendered as ${result.page}`);
  if (!result.appHtml.includes("<h1")) throw new Error(`${route.path} rendered without an <h1>`);
  const html = buildDocument(result, route.page);
  const outDir = route.path === "/" ? client : join(client, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  written.push([route.path, html.length]);
}

const notFound = await render("/__not-found__");
writeFileSync(join(client, "404.html"), buildDocument(notFound, "notFound"));
written.push(["/404.html", 0]);

writeFileSync(join(client, "sitemap.xml"), buildSitemap());
writeFileSync(join(client, "robots.txt"), buildRobots());
// Routes that have a prerendered file (read by server.mjs).
writeFileSync(join(client, "routes.json"), JSON.stringify(ROUTES.map((r) => r.path)));

// ── Precompress ──────────────────────────────────────────────────────────────
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".xml", ".txt", ".json", ".svg", ".webmanifest"]);
let compressed = 0;
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) {
      if (name !== ".vite") walk(file);
      continue;
    }
    if (!COMPRESSIBLE.has(extname(name)) || statSync(file).size < 1024) continue;
    const data = readFileSync(file);
    writeFileSync(`${file}.br`, brotliCompressSync(data, { params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_SIZE_HINT]: data.length } }));
    writeFileSync(`${file}.gz`, gzipSync(data, { level: 9 }));
    compressed++;
  }
})(client);

console.log(`prerender: ${ROUTES.length} routes + 404 → dist/client (site ${SITE_URL}, indexing ${ALLOW_INDEXING ? "on" : "OFF"})`);
for (const [path, size] of written) console.log(`  ${path.padEnd(12)} ${size ? `${(size / 1024).toFixed(1)} KB` : ""}`);
console.log(`prerender: sitemap.xml, robots.txt, routes.json written; ${compressed} files precompressed (br + gz)`);
