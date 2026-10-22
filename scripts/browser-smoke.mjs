import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseURL = process.env.TEST_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
await mkdir('screenshots', { recursive: true });
const failures = [];
const sections = ['top', 'thinking', 'about', 'capabilities', 'products', 'why-ladder7', 'faq', 'contact'];

async function photograph(page, name, selector) {
  await page.locator(selector).evaluate(el => {
    document.documentElement.style.scrollBehavior='auto';
    window.scrollTo(0, Math.max(0, window.scrollY + el.getBoundingClientRect().top - 88));
  });
  await page.waitForTimeout(240);
  await page.screenshot({ path: `screenshots/${name}.png`, animations: 'disabled' });
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
          scene: dock.dataset.variant,
          tag: el.tagName,
          copy: (el.textContent || el.getAttribute('alt') || '').slice(0,45),
          xOverlap: Math.round(dx), yOverlap: Math.round(dy),
        });
      }
    }
    return { ...extents, collisions };
  });
  assert.ok(result.html <= result.viewport + 2, `HTML horizontal overflow at ${width}px: ${JSON.stringify(result)}`);
  assert.ok(result.body <= result.viewport + 2, `Body horizontal overflow at ${width}px: ${JSON.stringify(result)}`);
  assert.deepEqual(result.collisions, [], `Gesture interferes with content at ${width}px: ${JSON.stringify(result.collisions)}`);
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
  for (const [width, height] of [[1440,900], [1024,768], [768,1024], [390,844], [360,780]]) {
    const page = await browser.newPage({ viewport:{width,height}, deviceScaleFactor:1 });
    page.on('pageerror', error => failures.push(`${width}px: ${error.message}`));
    await page.goto(baseURL, { waitUntil:'networkidle' });
    assert.equal(await page.locator('h1').count(),1,`Duplicate H1 at ${width}px`);
    assert.equal(await page.locator('.network-experience').count(),0,'Legacy fixed background still mounted');
    assert.equal(await page.locator('.gesture-dock').count(),8,'Missing section-local gesture dock');
    assert.equal(await page.locator('main .scene').count(),8);

    for (const id of sections) {
      assert.equal(await page.locator(`#${id}`).count(),1,`Missing section ${id}`);
      await photograph(page, `${width}-${id}`,`#${id}`);
      if (id !== 'top') {
        const dock = page.locator(`#${id} .gesture-dock`);
        assert.equal(await dock.count(),1,`Missing unique gesture for ${id} at ${width}`);
        assert.ok(await dock.locator('svg path').count() >= 4,`Empty SVG in ${id} at ${width}`);
      }
    }
    await page.locator('#training').scrollIntoViewIfNeeded();
    await photograph(page,`${width}-footer`,'#footer');
    await assertLayout(page,width);
    await checkAssets(page);
    // Typography must survive Tailwind's reset; previously these headings
    // rendered at inherited 16px despite looking correctly marked up.
    for (const id of ['services-title','products-title','why-title']) {
      const px = await page.locator('#'+id).evaluate(el => parseFloat(getComputedStyle(el).fontSize));
      assert.ok(px >= 40, `Undersized section heading #${id}: ${px}px at ${width}px`);
    }
    const gestureSafety = await page.locator('.gesture-dock').evaluateAll(docks =>
      docks.every(dock => {
        const svg = dock.querySelector('svg');
        return getComputedStyle(dock).pointerEvents === 'none' &&
          getComputedStyle(dock).overflow === 'hidden' &&
          !!svg && getComputedStyle(svg).overflow === 'hidden';
      }));
    assert.ok(gestureSafety,`Artwork may paint or intercept interaction outside its dock at ${width}px`);

    if (width === 1440) {
      const hashes = await page.locator('a[href^="#"]').evaluateAll(links =>
        links.map(link => link.getAttribute('href')).filter(href => href && href !== '#'));
      for (const hash of hashes) assert.equal(await page.locator(hash).count(),1,`Broken anchor: ${hash}`);

      // Contrast modes and navigational controls must survive the animation rig.
      await page.getByRole('button',{name:'Switch to light theme'}).click();
      assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
      await photograph(page,'1440-light-mode-hero','#top');
      await page.getByRole('button',{name:'Switch to dark theme'}).click();
      assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
      for (const [href,count] of [['mailto:info@ladder7.in',1],['tel:+918137979401',1]]) {
        assert.ok((await page.locator(`a[href="${href}"]`).count()) >= count,
          `Missing clickable contact destination: ${href}`);
      }

      const initialVariant = await page.locator('#capabilities .gesture-dock').getAttribute('data-variant');
      assert.equal(initialVariant,'digital');
      await page.locator('.service-line').nth(1).locator('button').click();
      assert.equal(await page.locator('.service-line').nth(1).locator('button').getAttribute('aria-expanded'),'true');
      assert.equal(await page.locator('#capabilities .gesture-dock').getAttribute('data-variant'),'automation');

      const productTab = page.getByRole('tab',{name:/L7 Nexus/});
      await productTab.click();
      assert.equal(await page.locator('#product-panel h3').innerText(),'L7 Nexus');
      await productTab.press('ArrowDown');
      assert.equal(await page.locator('#product-panel h3').innerText(),'L7 Insights');

      const faq = page.locator('.faq-entry').nth(1);
      await faq.locator('button').click();
      assert.equal(await faq.locator('button').getAttribute('aria-expanded'),'true');
      assert.equal(await faq.locator('[role="region"]').isVisible(),true);
      assert.equal(await page.locator('.faq-entry').count(),3);

      const fingers = ['thumb','index','middle','ring','little'];
      for (const finger of fingers) {
        assert.equal(await page.locator(`#faq [data-stroke="${finger}"]`).count(),1,`FAQ missing ${finger}`);
      }
      assert.equal(await page.locator('#faq [data-question-path]').count(),1,'Missing line-constructed question mark');
      await photograph(page,'1440-faq-expanded','#faq');
      // Scroll-scrubbing must be continuous and reversible, not an opacity-only image swap.
      const faqDock = page.locator('#faq .gesture-dock');
      await faqDock.scrollIntoViewIfNeeded();
      const sceneBefore = await faqDock.evaluate(el => ({
        progress:Number(el.dataset.progress),
        hand:el.querySelector('[data-hand-rig]')?.getAttribute('transform'),
        stage:el.querySelector('[data-stroke="middle"] path:last-child')?.style.strokeDashoffset,
      }));
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior='auto';
        window.scrollBy(0,190);
      });
      await page.waitForTimeout(140);
      const sceneForward = await faqDock.evaluate(el => ({
        progress:Number(el.dataset.progress),
        hand:el.querySelector('[data-hand-rig]')?.getAttribute('transform'),
        stage:el.querySelector('[data-stroke="middle"] path:last-child')?.style.strokeDashoffset,
      }));
      await page.evaluate(() => window.scrollBy(0,-190));
      await page.waitForTimeout(140);
      const sceneReverse = await faqDock.evaluate(el => ({
        progress:Number(el.dataset.progress),
        hand:el.querySelector('[data-hand-rig]')?.getAttribute('transform'),
        stage:el.querySelector('[data-stroke="middle"] path:last-child')?.style.strokeDashoffset,
      }));
      assert.ok(sceneForward.progress > sceneBefore.progress + .01,
        `FAQ not scroll-driven: ${JSON.stringify({sceneBefore,sceneForward})}`);
      assert.ok(sceneReverse.progress < sceneForward.progress - .01,
        `FAQ not reversible: ${JSON.stringify({sceneForward,sceneReverse})}`);
      assert.notEqual(sceneForward.hand,sceneBefore.hand,'FAQ hand rig must move as it forms');
      await photograph(page,'1440-faq-reverse','#faq');
      // Capture the actual contact action, not only the beginning of its
      // section when the hands are intentionally still approaching.
      const contactDock = page.locator('#contact .gesture-dock');
      await contactDock.evaluate(el => {
        document.documentElement.style.scrollBehavior='auto';
        window.scrollTo(0,Math.max(0,window.scrollY+el.getBoundingClientRect().top-80));
      });
      await page.waitForTimeout(160);
      const contactProgress = Number(await contactDock.getAttribute('data-progress'));
      assert.ok(contactProgress > .50,`Contact joining phase did not activate: ${contactProgress}`);
      await page.screenshot({path:'screenshots/1440-contact-connection.png',animations:'disabled'});
      assert.equal(await page.locator('#products .product-visual .product-gesture').count(),1,
        'Product gesture must live with its real image in an independent dock');
    }
    if (width <= 390) {
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior='auto';
        window.scrollTo(0,0);
      });
      await page.waitForTimeout(160);
      const hero = await page.locator('#top .gesture-hero').boundingBox();
      assert.ok(hero && hero.y < height - 25 && hero.y + hero.height > 60,
        `Hero palm must visibly appear in the initial mobile viewport at ${width}px: ${JSON.stringify(hero)}`);
      await page.getByRole('button',{name:'Open menu'}).click();
      assert.equal(await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),true);
      await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:/Contact Us/}).click();
      assert.equal(await page.getByRole('button',{name:'Open menu'}).getAttribute('aria-expanded'),'false');
    }
    await page.close();
    console.log(`PASS: ${width}px section gestures, assets, no overlaps, no horizontal overflow and screenshot coverage`);
  }

  // Save a real browser recording of the continuous, reversible choreography.
  // Frames are captured from the compiled site; this is not a CSS mock-up.
  const cinema = await browser.newContext({
    viewport:{ width:1280,height:760 },
    reducedMotion:'no-preference',
    recordVideo:{ dir:'screenshots',size:{width:1280,height:760} },
  });
  const film = await cinema.newPage();
  await film.goto(baseURL,{waitUntil:'networkidle'});
  await film.evaluate(() => { document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0,0); });
  const total = await film.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const frames = 135;
  for (let i=0; i<=frames; i++) {
    const t=i/frames;
    const travel=t < .5 ? (t*2) : (2-t*2);
    const distance=total * travel;
    await film.evaluate(y => window.scrollTo(0,y),distance);
    await film.waitForTimeout(75);
  }
  await film.close();
  await film.video().saveAs('screenshots/ladder7-scroll-choreography.webm');
  await cinema.close();

  const page = await browser.newPage({ reducedMotion:'reduce', viewport:{width:1440,height:900} });
  page.on('pageerror', error => failures.push(`reduced-motion: ${error.message}`));
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.locator('#top .gesture-hero').scrollIntoViewIfNeeded();
  await page.waitForTimeout(80);
  const offset = await page.locator('#top [data-stroke="index"] path').first().evaluate(el => el.style.strokeDashoffset);
  assert.equal(offset,'0','Reduced-motion hand must be fully illustrated');
  assert.equal(await page.locator('#top .gesture-hero').getAttribute('data-phase'),'rest',
    'Reduced motion should not articulate the hand');
  await photograph(page,'reduced-motion-hero','#top');
  await page.close();
  assert.deepEqual(failures,[],'Critical page errors');
  console.log('PASS: navigation, service switching, product tabs, FAQ fingers, responsive visual docks, images, reduced-motion and console checks.');
  console.log('Screenshots saved to screenshots/ and uploaded as GitHub Actions artifact.');
} finally {
  await browser.close();
}
