/**
 * Production static server for dist/client — no dependencies (Node ≥ 22).
 *
 *   npm run build && npm start        → http://localhost:8080
 *
 * Behaviour (same contract as Whiteline's Express server):
 *  - prerendered routes: /about → about/index.html ("/about/" 301s to "/about");
 *  - unknown URLs get 404.html with a real HTTP 404 (no soft-404s);
 *  - precompressed .br / .gz variants when the browser accepts them;
 *  - /assets/* (content-hashed) cached for a year as immutable, HTML no-cache,
 *    other static files for 30 days;
 *  - baseline security headers.
 *
 * Any static host works instead (see SETUP_AND_DEPLOYMENT.md); this file
 * exists for Node hosts such as Azure App Service, Render or a VPS.
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "dist", "client");
const PORT = Number(process.env.PORT) || 8080;

if (!existsSync(join(ROOT, "index.html"))) {
  console.error("server: dist/client not found — run `npm run build` first.");
  process.exit(1);
}

const routes = new Set(JSON.parse(readFileSync(join(ROOT, "routes.json"), "utf8")));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

/** Resolves a URL path to a file inside ROOT, or null (blocks path traversal). */
function resolveFile(pathname) {
  const file = normalize(join(ROOT, pathname));
  if (file !== ROOT && !file.startsWith(ROOT + sep)) return null;
  try {
    return statSync(file).isFile() ? file : null;
  } catch {
    return null;
  }
}

function cacheControl(pathname, ext) {
  if (ext === ".html") return "no-cache";
  if (pathname.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt" || ext === ".webmanifest") return "public, max-age=3600";
  return "public, max-age=2592000";
}

function send(req, res, file, status, pathname) {
  const ext = extname(file);
  const accept = String(req.headers["accept-encoding"] ?? "");
  let body = file;
  let encoding = null;
  if (/\bbr\b/.test(accept) && existsSync(`${file}.br`)) [body, encoding] = [`${file}.br`, "br"];
  else if (/\bgzip\b/.test(accept) && existsSync(`${file}.gz`)) [body, encoding] = [`${file}.gz`, "gzip"];

  const headers = {
    ...SECURITY_HEADERS,
    "Content-Type": TYPES[ext] ?? "application/octet-stream",
    "Content-Length": statSync(body).size,
    "Cache-Control": status === 404 ? "no-cache" : cacheControl(pathname, ext),
    Vary: "Accept-Encoding",
  };
  if (encoding) headers["Content-Encoding"] = encoding;
  res.writeHead(status, headers);
  if (req.method === "HEAD") return res.end();
  createReadStream(body).pipe(res);
}

const server = createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD", ...SECURITY_HEADERS }).end();
    return;
  }

  let url;
  try {
    url = new URL(req.url ?? "/", "http://localhost");
  } catch {
    res.writeHead(400).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  // Canonical form: no trailing slash (except "/"), so each page has one URL.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const target = pathname.replace(/\/+$/, "") || "/";
    res.writeHead(301, { Location: target + url.search, ...SECURITY_HEADERS }).end();
    return;
  }

  // Prerendered routes (case-sensitive, lower-case only).
  if (routes.has(pathname)) {
    const file = resolveFile(pathname === "/" ? "/index.html" : `${pathname}/index.html`);
    if (file) return send(req, res, file, 200, pathname);
  }

  // Static files (never serve the precompressed variants or build metadata directly).
  if (!/\.(br|gz)$/.test(pathname) && !pathname.startsWith("/.vite/") && !pathname.endsWith("/index.html")) {
    const file = resolveFile(pathname);
    if (file) return send(req, res, file, 200, pathname);
  }

  send(req, res, join(ROOT, "404.html"), 404, pathname);
});

server.listen(PORT, () => console.log(`Ladder7 site: http://localhost:${PORT}`));
