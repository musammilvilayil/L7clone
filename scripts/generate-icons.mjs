/**
 * Builds favicons, app icons and the structured-data logo from the brand logo
 * (assets-src/images/ladder7-logo.webp).
 *
 *   npm run icons
 *
 * The design file ships no favicon. The icons reuse the logo's own "L7"
 * emblem, placed on the page background colour (#101416) because the logo is
 * white-on-transparent. Outputs are committed.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = join(root, "assets-src", "images", "ladder7-logo.webp");
const out = join(root, "public", "icons");
mkdirSync(out, { recursive: true });

const BG = "#101416";

// The emblem is the left part of the logo (the wordmark starts at ~250px).
const left = await sharp(LOGO).extract({ left: 0, top: 0, width: 240, height: 320 }).png().toBuffer();
const emblem = await sharp(left).trim({ threshold: 1 }).png().toBuffer();

/**
 * @param {number} size   output square size
 * @param {number} scale  emblem width as a share of the square
 * @param {number} radius corner radius as a share of the square (0 = square)
 */
async function icon(size, scale, radius, file) {
  const r = Math.round(size * radius);
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${BG}"/></svg>`,
  );
  const mark = await sharp(emblem).resize({ width: Math.round(size * scale) }).toBuffer();
  await sharp(bg).composite([{ input: mark, gravity: "center" }]).png({ compressionLevel: 9 }).toFile(join(out, file));
}

await icon(32, 0.72, 0.2, "favicon-32.png");
await icon(48, 0.72, 0.2, "favicon-48.png");
await icon(180, 0.62, 0, "apple-touch-icon.png"); // iOS applies its own mask
await icon(192, 0.62, 0.22, "icon-192.png");
await icon(512, 0.62, 0.22, "icon-512.png");
await icon(512, 0.46, 0, "icon-maskable-512.png"); // inside the 80% safe zone

// Structured-data logo (Google renders logos on white, so keep the dark plate).
const wordmark = await sharp(LOGO).resize({ width: 440 }).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: BG } })
  .composite([{ input: wordmark, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile(join(out, "ladder7-logo-512.png"));

console.log("icons: favicon-32/48, apple-touch-icon, icon-192/512, maskable, schema logo → public/icons");
