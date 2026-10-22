import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL = process.env.TEST_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const issues = [];
await mkdir('screenshots', { recursive: true });

async function snapshot(page, name, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await page.screenshot({ path: `screenshots/${name}.png`, animations: 'disabled' });
}
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', error => issues.push(error.message));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  assert.match(await page.title(), /Ladder7/);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('main #top').count(), 1);
  for (const id of ['about', 'thinking', 'capabilities', 'products', 'why-ladder7', 'faq', 'contact', 'training']) {
    assert.equal(await page.locator(`#${id}`).count(), 1, `Missing section: ${id}`);
  }
  const hashes = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
  for (const hash of hashes) {
    if (hash === '#') continue;
    assert.equal(await page.locator(hash).count(), 1, `Broken anchor: ${hash}`);
  }
  assert.equal(await page.locator('.service-line').count(), 4);
  await page.locator('.service-line').nth(1).locator('button').click();
  assert.equal(await page.locator('.service-line').nth(1).locator('button').getAttribute('aria-expanded'), 'true');

  const productTab = page.getByRole('tab', { name: /L7 Nexus/ });
  await productTab.click();
  assert.equal(await productTab.getAttribute('aria-selected'), 'true');
  assert.equal(await page.locator('#product-panel h3').innerText(), 'L7 Nexus');
  await productTab.press('ArrowDown');
  assert.equal(await page.locator('#product-panel h3').innerText(), 'L7 Insights');

  const faq = page.locator('.faq-entry').nth(1);
  await faq.locator('button').click();
  assert.equal(await faq.locator('button').getAttribute('aria-expanded'), 'true');
  assert.equal(await faq.locator('[role=region]').isVisible(), true);
  assert.equal(await page.locator('.faq-entry').count(), 3);

  await snapshot(page, 'desktop-hero', '#top');
  await snapshot(page, 'desktop-services', '#capabilities');
  await snapshot(page, 'desktop-products', '#products');
  await snapshot(page, 'desktop-faq', '#faq');
  await snapshot(page, 'desktop-contact', '#contact');

  const unloaded = await page.locator('img').evaluateAll(images => images
    .filter(image => image.complete && image.naturalWidth === 0).map(image => image.src));
  assert.equal(unloaded.length, 0, `Failed images: ${unloaded.join(', ')}`);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1 });
  mobile.on('pageerror', error => issues.push(error.message));
  await mobile.goto(baseURL, { waitUntil: 'networkidle' });
  await mobile.getByRole('button', { name: 'Open menu' }).click();
  assert.equal(await mobile.getByRole('navigation', { name: 'Mobile navigation' }).isVisible(), true);
  await mobile.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Contact Us/ }).click();
  assert.equal(await mobile.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');
  await snapshot(mobile, 'mobile-hero', '#top');
  await snapshot(mobile, 'mobile-faq', '#faq');

  const reduced = await browser.newPage({ reducedMotion: 'reduce' });
  reduced.on('pageerror', error => issues.push(error.message));
  await reduced.goto(baseURL, { waitUntil: 'networkidle' });
  assert.equal(await reduced.locator('.network-experience').count(), 1);
  assert.equal(issues.length, 0, `Runtime errors: ${issues.join(' | ')}`);
  console.log('PASS: anchors, services, product tabs+keyboard, FAQs, menus, images, runtime errors, reduced-motion render.');
  console.log('Screenshots saved under screenshots/.');
} finally {
  await browser.close();
}
