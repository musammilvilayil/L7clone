import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless:true, args:['--no-sandbox'] });
const base = process.env.TEST_URL || 'http://127.0.0.1:4173';
await mkdir('footer-screenshots',{recursive:true});

try {
  for (const [width,height] of [[320,700],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080]]) {
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',err=>errors.push(err.message));
    await page.goto(base,{waitUntil:'networkidle'});
    const footer=page.locator('#footer');
    const brand=footer.locator('.cin-footer-oversized-logo img');
    assert.equal(await brand.count(),1,'Exactly one oversized footer mark should exist');
    await brand.evaluate(async el=>{
      el.loading='eager';
      if (!el.complete) await new Promise((resolve,reject)=>{
        el.addEventListener('load',resolve,{once:true});
        el.addEventListener('error',reject,{once:true});
      });
      if (el.decode) await el.decode();
    });
    await brand.scrollIntoViewIfNeeded();
    const m=await brand.evaluate(img=>{
      const box=img.getBoundingClientRect();
      const frame=img.parentElement.getBoundingClientRect();
      const frameCss=getComputedStyle(img.parentElement);
      const foot=img.closest('footer').getBoundingClientRect();
      const base=img.closest('footer').querySelector('.cin-footer-base').getBoundingClientRect();
      const lead=img.closest('footer').querySelector('.cin-footer-lead');
      const columns=img.closest('footer').querySelector('.cin-footer-grid');
      return {width:box.width,height:box.height,left:box.left,right:box.right,top:box.top,
        frameWidth:frame.width,frameHeight:frame.height,frameLeft:frame.left,
        frameRight:frame.right,frameTop:frame.top,frameBottom:frame.bottom,
        overflow:frameCss.overflow, frameRatio:frame.width/frame.height,
        estimatedInkTop:box.top+box.height*.28,
        estimatedInkBottom:box.top+box.height*.795,
        naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,
        footerBottom:foot.bottom,contentBottom:base.bottom,
        fit:getComputedStyle(img).objectFit,leadVisible:!!lead,columnsVisible:!!columns,
        viewport:window.innerWidth,scrollWidth:document.documentElement.scrollWidth};
    });
    assert.ok(m.naturalWidth>0&&m.naturalHeight>0,'Logo asset must load');
    assert.ok(m.width>=width*.94,`Brand does not nearly fill footer: ${width}px, ${JSON.stringify(m)}`);
    assert.ok(Math.abs(m.width/m.height-m.naturalWidth/m.naturalHeight)<.015,
      `Original logo aspect ratio distorted at ${width}px`);
    assert.ok(m.frameTop>=m.contentBottom-2,`Logo region overlaps existing footer content at ${width}px`);
    assert.ok(m.footerBottom-m.frameBottom<=2,`Unnecessary space below visible footer region at ${width}px`);
    assert.ok(m.frameWidth>=width*.985 && m.frameLeft>=-1 && m.frameRight<=width+1,
      `Footer brand region not edge-to-edge at ${width}px: ${JSON.stringify(m)}`);
    assert.equal(m.overflow,'hidden','Only empty intrinsic image margins must be masked');
    assert.ok(m.estimatedInkTop>=m.frameTop-5 && m.estimatedInkBottom<=m.frameBottom+6,
      `Logo visible glyphs may be cropped at ${width}px: ${JSON.stringify(m)}`);
    assert.ok(m.scrollWidth<=width+2,`Horizontal page overflow at ${width}px`);
    assert.equal(m.fit,'contain');
    assert.ok(m.leadVisible&&m.columnsVisible,'Footer content was removed');
    assert.equal(await footer.locator('.cin-footer-grid > div').count(),4,
      'Original four footer columns must remain untouched');
    assert.ok(await footer.locator('a[href="mailto:info@ladder7.in"]').count()>=1);
    assert.ok(await footer.locator('a[href="tel:+918137979401"]').count()>=1);
    assert.ok(await footer.locator('.cin-footer-base').getByText(/all rights reserved/i).count()>=1);
    assert.deepEqual(errors,[],`Browser errors at ${width}px`);
    await footer.screenshot({path:`footer-screenshots/${width}-dark.png`,animations:'disabled'});
    if(width===390||width===1440){
      await page.getByRole('button',{name:'Switch to light theme'}).click();
      await brand.evaluate(async img=>{ if(img.decode) await img.decode(); });
      assert.ok((await brand.getAttribute('src'))?.includes('logo-primary.webp'),
        'Light footer should use original primary logo');
      await footer.screenshot({path:`footer-screenshots/${width}-light.png`,animations:'disabled'});
    }
    console.log(`PASS ${width}px: wordmark occupies ${Math.round(m.frameWidth)} × ${Math.round(m.frameHeight)} region, original aspect ratio intact, intrinsic transparent padding masked`);
    await page.close();
  }
}finally{
  await browser.close();
}
