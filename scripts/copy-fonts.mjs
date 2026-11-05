/**
 * Copies the self-hosted Geist variable font (Latin subset) from the
 * @fontsource-variable/geist package into public/fonts.
 *
 * The file is committed, so this only needs re-running when upgrading the font:
 *   npm run fonts
 *
 * Why self-host: the design loaded Geist from Google Fonts, which costs two
 * extra connections (fonts.googleapis.com + fonts.gstatic.com) before text can
 * render in the brand face. A same-origin, preloaded WOFF2 avoids both.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = join(root, "node_modules", "@fontsource-variable", "geist");
const out = join(root, "public", "fonts");
mkdirSync(out, { recursive: true });

copyFileSync(
  join(pkg, "files", "geist-latin-wght-normal.woff2"),
  join(out, "geist-latin-wght-normal.woff2"),
);
copyFileSync(join(pkg, "LICENSE"), join(out, "GEIST-LICENSE.txt"));
console.log("fonts: copied geist-latin-wght-normal.woff2 + licence to public/fonts");
