import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
let chromium;
try {
  const p = await import('playwright');
  chromium = p.chromium;
} catch {
  const p = await import('playwright-core');
  chromium = p.chromium;
}
import fs from 'node:fs';

const baseURL = process.env.TEST_URL || 'http://127.0.0.1:5173';

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium'
].filter(Boolean);

let executablePath = chromeCandidates.find(p => fs.existsSync(p));

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

await mkdir('screenshots', { recursive: true });
await mkdir('docs/screenshots', { recursive: true });
const failures = [];
const sections = ['top', 'thinking', 'about', 'capabilities', 'products', 'why-ladder7', 'faq', 'contact'];

async function photograph(page, name, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `screenshots/${name}.png` });
  await page.screenshot({ path: `docs/screenshots/${name}.png` });
}

async function assertLayout(page, width) {
  const result = await page.evaluate(() => {
    const extents = {
      viewport: window.innerWidth,
      html: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    };
    const protectedNodes = Array.from(document.querySelectorAll('h1,h2,h3,p,button,a,img'));
    const collisions = [];
    for (const dock of document.querySelectorAll('.gesture-dock')) {
      const visual = dock.getBoundingClientRect();
      for (const el of protectedNodes) {
        if (dock.contains(el) || !el.closest('section') || el.closest('section') !== dock.closest('section')) continue;
        const css = getComputedStyle(el);
        if (css.display === 'none' || css.visibility === 'hidden' || el.closest('[hidden]')) continue;
        const text = el.getBoundingClientRect();
        const dx = Math.min(visual.right, text.right) - Math.max(visual.left, text.left);
        const dy = Math.min(visual.bottom, text.bottom) - Math.max(visual.top, text.top);
        if (dx > 5 && dy > 5) collisions.push({
          scene: dock.dataset.scene || dock.dataset.variant,
          tag: el.tagName,
          copy: (el.textContent || el.getAttribute('alt') || '').slice(0, 45),
          xOverlap: Math.round(dx), yOverlap: Math.round(dy),
        });
      }
    }
    return { ...extents, collisions };
  });
  assert.ok(result.html <= result.viewport + 2, `HTML horizontal overflow at ${width}px: ${JSON.stringify(result)}`);
  assert.ok(result.body <= result.viewport + 2, `Body horizontal overflow at ${width}px: ${JSON.stringify(result)}`);
  assert.deepEqual(result.collisions, [], `Gesture dock interferes with content at ${width}px: ${JSON.stringify(result.collisions)}`);
}

async function checkAssets(page) {
  await page.locator('img').evaluateAll(async images => {
    await Promise.all(images.map(img => {
      img.loading = 'eager';
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
        setTimeout(resolve, 5000);
      });
    }));
  });
  const broken = await page.locator('img').evaluateAll(images =>
    images.filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src));
  assert.deepEqual(broken, [], `Broken assets: ${broken.join(', ')}`);
}

try {
  for (const [width, height] of [[1440, 900], [1024, 768], [768, 1024], [390, 844], [360, 780]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    page.on('pageerror', error => failures.push(`${width}px: ${error.message}`));
    await page.goto(baseURL, { waitUntil: 'networkidle' });

    assert.equal(await page.locator('h1').count(), 1, `Duplicate H1 at ${width}px`);
    assert.equal(await page.locator('.gesture-stage').count(), 1, 'Missing continuous gesture canvas stage');
    assert.equal(await page.locator('.gesture-dock').count(), 8, 'Missing gesture anchors');
    assert.equal(await page.locator('main .scene').count(), 8);

    for (const id of sections) {
      assert.equal(await page.locator(`#${id}`).count(), 1, `Missing section ${id}`);
      await photograph(page, `smoke-${width}-${id}`, `#${id}`);
      const dock = page.locator(`#${id} .gesture-dock`);
      assert.equal(await dock.count(), 1, `Missing gesture dock for ${id} at ${width}`);
    }

    await page.locator('#training').scrollIntoViewIfNeeded();
    await photograph(page, `smoke-${width}-footer`, '#footer');
    await assertLayout(page, width);
    await checkAssets(page);

    if (width === 1440) {
      const hashes = await page.locator('a[href^="#"]').evaluateAll(links =>
        links.map(link => link.getAttribute('href')).filter(href => href && href !== '#'));
      for (const hash of hashes) assert.equal(await page.locator(hash).count(), 1, `Broken anchor: ${hash}`);

      // Service switching
      assert.equal(await page.locator('#capabilities .gesture-dock').getAttribute('data-scene'), 'connect');
      await page.locator('.service-line').nth(1).locator('button').click();
      assert.equal(await page.locator('.service-line').nth(1).locator('button').getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#capabilities .gesture-dock').getAttribute('data-scene'), 'point');

      // Product switching
      const productTab = page.getByRole('tab', { name: /L7 Nexus/ });
      await productTab.click();
      assert.equal(await page.locator('#product-panel h3').innerText(), 'L7 Nexus');
      const prodImg = await page.locator('#product-panel img').getAttribute('src');
      assert.ok(prodImg.includes('nexushome.jpeg'), `Expected authentic screenshot for L7 Nexus, got ${prodImg}`);

      // FAQ accordion
      const faq = page.locator('.faq-entry').nth(1);
      await faq.locator('button').click();
      assert.equal(await faq.locator('button').getAttribute('aria-expanded'), 'true');
      assert.equal(await faq.locator('[role="region"]').isVisible(), true);
      assert.equal(await page.locator('.faq-entry').count(), 3);
    }

    if (width <= 390) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      assert.equal(await page.getByRole('navigation', { name: 'Mobile navigation' }).isVisible(), true);
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Contact Us/ }).click();
      assert.equal(await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');
    }

    await page.close();
    console.log(`PASS: ${width}px continuous 3D gesture system, assets, no overlaps, no horizontal overflow`);
  }

  // Reduced motion check
  const page = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  page.on('pageerror', error => failures.push(`reduced-motion: ${error.message}`));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const hasCanvas = await page.locator('.gesture-stage').count();
  assert.equal(hasCanvas, 1, 'Canvas stage must be mounted under reduced motion');
  await photograph(page, 'smoke-reduced-motion-hero', '#top');
  await page.close();

  assert.deepEqual(failures, [], 'Critical page errors');
  console.log('PASS: All browser smoke tests passed cleanly!');
} finally {
  await browser.close();
}
