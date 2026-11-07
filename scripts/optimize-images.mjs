/**
 * Responsive image pipeline.
 *
 * Reads the original design images from assets-src/images and writes resized
 * WebP variants to public/images, plus a typed manifest that the
 * <ResponsiveImage> component reads (src/data/images.generated.ts).
 *
 *   npm run images
 *
 * Outputs are committed; re-run only when a source image changes or a new one
 * is added to JOBS. Widths are chosen from the largest rendered size of each
 * image in the layout (×2 for high-density screens), never larger than the
 * source.
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "assets-src", "images");
const OUT = join(root, "public", "images");

/** @type {{ src: string, name: string, widths: number[], formats: ("avif"|"webp")[], quality?: { avif: number, webp: number } }[]} */
const JOBS = [
  // Header + footer logo: rendered at 142 css px wide → 1x and 2x.
  { src: "ladder7-logo.webp", name: "brand/ladder7-logo", widths: [284, 568], formats: ["webp"] },
  // "Why Ladder7" statues: transparent, rendered up to ~520 css px wide.
  { src: "statue-fractured.png", name: "why/statue-fractured", widths: [400, 480, 640, 1024], formats: ["webp"], quality: { avif: 52, webp: 78 } },
  { src: "statue-restored.png", name: "why/statue-restored", widths: [400, 480, 640, 1024], formats: ["webp"], quality: { avif: 52, webp: 78 } },
  // Photos: film launch (up to ~1100 css px, darkened), slides, collage tiles (~330 css px).
  { src: "workspace-laptop.jpg", name: "photos/workspace-laptop", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "ai-processor.jpg", name: "photos/ai-processor", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "code-editor.jpg", name: "photos/code-editor", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "online-checkout.jpg", name: "photos/online-checkout", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "team-workshop.webp", name: "photos/team-workshop", widths: [480, 800, 1200], formats: ["webp"] },
  // Education page: wall collage + program cards (same ~330–700 css px range).
  { src: "mentorship-interview.jpg", name: "photos/mentorship-interview", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "mountain-climb.webp", name: "photos/mountain-climb", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "mindful-reflection.webp", name: "photos/mindful-reflection", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "self-reflection-mirror.webp", name: "photos/self-reflection-mirror", widths: [480, 800, 1200], formats: ["webp"] },
  // Generic landing-hero side image, reused across simple content pages (Careers, Portfolio, …).
  { src: "team-collaboration.webp", name: "photos/team-collaboration", widths: [480, 800, 1200], formats: ["webp"] },
  // About page: scrolling collage columns (small decorative tiles, ~300–430 css px wide).
  { src: "idea-lightbulb.webp", name: "photos/idea-lightbulb", widths: [300, 600, 900], formats: ["webp"] },
  { src: "ai-network-brain.webp", name: "photos/ai-network-brain", widths: [300, 600, 900], formats: ["webp"] },
  { src: "product-dashboard-scan.webp", name: "photos/product-dashboard-scan", widths: [300, 600, 900], formats: ["webp"] },
  { src: "product-dashboard-agents.webp", name: "photos/product-dashboard-agents", widths: [300, 600, 900], formats: ["webp"] },
  { src: "product-dashboard-nocode.webp", name: "photos/product-dashboard-nocode", widths: [300, 600, 900], formats: ["webp"] },
  { src: "team-whiteboard-session.webp", name: "photos/team-whiteboard-session", widths: [300, 600, 900], formats: ["webp"] },
  // About page: expertise section image (up to ~700 css px wide).
  { src: "team-collaboration-desks.webp", name: "photos/team-collaboration-desks", widths: [480, 800, 1200], formats: ["webp"] },
  // Products: hub hero + two product-detail hero images (same ~700 css px range).
  { src: "team-analytics-review.webp", name: "photos/team-analytics-review", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "product-outreach-dashboard.webp", name: "photos/product-outreach-dashboard", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "product-insights-dashboard.webp", name: "photos/product-insights-dashboard", widths: [480, 800, 1200], formats: ["webp"] },
  // Products catalogue: small card thumbnails (~330 css px wide).
  { src: "mirror-reflection-portrait.webp", name: "photos/mirror-reflection-portrait", widths: [300, 600, 900], formats: ["webp"] },
  { src: "students-laptop-group.webp", name: "photos/students-laptop-group", widths: [300, 600, 900], formats: ["webp"] },
  // Corporate Training: hub catalogue cards (~46vw) + course-detail heroes (~40vw).
  { src: "training-laptop-code.webp", name: "photos/training-laptop-code", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "training-python-code.webp", name: "photos/training-python-code", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "training-mobile-phone.webp", name: "photos/training-mobile-phone", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "training-ai-prompt.webp", name: "photos/training-ai-prompt", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "training-analytics-dashboard.webp", name: "photos/training-analytics-dashboard", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "training-server-rack.webp", name: "photos/training-server-rack", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "training-video-editing.webp", name: "photos/training-video-editing", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "training-analytics-meeting.webp", name: "photos/training-analytics-meeting", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "training-robot-ai.webp", name: "photos/training-robot-ai", widths: [480, 800, 1200], formats: ["webp"] },
  // Blog: hub story cards (~22vw) + article heroes (~40vw).
  { src: "blog-ai-personalization.jpg", name: "photos/blog-ai-personalization", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "blog-ai-tools-web-teams.jpg", name: "photos/blog-ai-tools-web-teams", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "blog-conversational-ai.jpg", name: "photos/blog-conversational-ai", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "blog-website-checks.jpg", name: "photos/blog-website-checks", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "blog-onam-celebration.jpg", name: "photos/blog-onam-celebration", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "blog-christmas-celebration.jpg", name: "photos/blog-christmas-celebration", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "blog-independence-day.jpg", name: "photos/blog-independence-day", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "earnmore.jpg", name: "photos/earnmore", widths: [480], formats: ["webp"] },
  { src: "course-software-testing.jpg", name: "photos/course-software-testing", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "course-shopify.jpg", name: "photos/course-shopify", widths: [480, 800, 1200], formats: ["webp"] },
  { src: "first-job.jpg", name: "photos/first-job", widths: [480, 800, 1200], formats: ["webp"] },
];

const DEFAULT_QUALITY = { avif: 50, webp: 74 };
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const manifest = {};

for (const job of JOBS) {
  const input = join(SRC, job.src);
  const meta = await sharp(input).metadata();
  const quality = job.quality ?? DEFAULT_QUALITY;
  const widths = job.widths.filter((w) => w <= meta.width);
  if (widths.length !== job.widths.length) {
    console.warn(`images: ${job.src} is ${meta.width}px wide; skipping larger widths`);
  }
  mkdirSync(dirname(join(OUT, job.name)), { recursive: true });

  for (const width of widths) {
    for (const format of job.formats) {
      const file = join(OUT, `${job.name}-${width}.${format}`);
      const pipeline = sharp(input).resize({ width, withoutEnlargement: true });
      if (format === "avif") pipeline.avif({ quality: quality.avif, effort: 6 });
      else pipeline.webp({ quality: quality.webp, effort: 6, alphaQuality: 90 });
      await pipeline.toFile(file);
      console.log(`  ${job.name}-${width}.${format}  ${kb(statSync(file).size)}`);
    }
  }

  manifest[job.name] = {
    width: meta.width,
    height: meta.height,
    widths,
    formats: job.formats,
  };
}

const banner =
  "// Generated by scripts/optimize-images.mjs — do not edit by hand.\n" +
  "// Run `npm run images` after changing assets-src/images.\n\n";
writeFileSync(
  join(root, "src", "data", "images.generated.ts"),
  `${banner}export const IMAGES = ${JSON.stringify(manifest, null, 2)} as const;\n\nexport type ImageName = keyof typeof IMAGES;\n`,
);
console.log(`images: ${Object.keys(manifest).length} sources → public/images, manifest → src/data/images.generated.ts`);
