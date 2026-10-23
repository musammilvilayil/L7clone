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
      const foot=img.closest('footer').getBoundingClientRect();
      const base=img.closest('footer').querySelector('.cin-footer-base').getBoundingClientRect();
      const lead=img.closest('footer').querySelector('.cin-footer-lead');
      const columns=img.closest('footer').querySelector('.cin-footer-grid');
      return {width:box.width,height:box.height,left:box.left,right:box.right,top:box.top,
        naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,
        footerBottom:foot.bottom,contentBottom:base.bottom,
        fit:getComputedStyle(img).objectFit,leadVisible:!!lead,columnsVisible:!!columns,
        viewport:window.innerWidth,scrollWidth:document.documentElement.scrollWidth};
    });
    assert.ok(m.naturalWidth>0&&m.naturalHeight>0,'Logo asset must load');
    assert.ok(m.width>=width*.94,`Brand does not nearly fill footer: ${width}px, ${JSON.stringify(m)}`);
    assert.ok(Math.abs(m.width/m.height-m.naturalWidth/m.naturalHeight)<.015,
      `Original logo aspect ratio distorted at ${width}px`);
    assert.ok(m.top>=m.contentBottom-2,`Logo overlaps existing footer content at ${width}px`);
    assert.ok(m.footerBottom-(m.top+m.height)<=12,`Unnecessary space below mark at ${width}px`);
    assert.ok(m.left>=-1&&m.right<=width+1,`Logo clipped at ${width}px`);
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
    console.log(`PASS ${width}px: logo ${Math.round(m.width)} × ${Math.round(m.height)}, content preserved, bottom gap ${Math.round(m.footerBottom-(m.top+m.height))}px`);
    await page.close();
  }
}finally{
  await browser.close();
}
