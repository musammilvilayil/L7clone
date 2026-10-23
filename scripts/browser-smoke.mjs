import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const origin=process.env.TEST_URL || 'http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const viewports=[[1440,900],[1920,1080],[1024,768],[768,1024],[430,932],[390,844],[375,812],[360,780],[320,700]];
const sections=['top','thinking','about','capabilities','products','engineering','why-ladder7','faq','contact'];
await mkdir('screenshots',{recursive:true});
const failures=[];

async function capture(page,name,id) {
  await page.locator('#'+id).evaluate(el=>{
    document.documentElement.style.scrollBehavior='auto';
    window.scrollTo(0,Math.max(0,window.scrollY + el.getBoundingClientRect().top - 92));
  });
  await page.waitForTimeout(95);
  await page.screenshot({path:'screenshots/'+name+'.png',animations:'disabled'});
}
async function checkImages(page) {
  const broken=await page.locator('img').evaluateAll(async images=>{
    await Promise.all(images.map(img=>img.decode?.().catch(()=>{}) ?? Promise.resolve()));
    return images.filter(img=>!img.naturalWidth).map(img=>img.getAttribute('src'));
  });
  assert.deepEqual(broken,[],'Images missing: '+broken.join(', '));
}

try {
  for (const [width,height] of viewports) {
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    page.on('pageerror',error=>failures.push(width+'px '+error.message));
    await page.goto(origin,{waitUntil:'networkidle'});
    assert.equal(await page.locator('main h1').count(),1,'Exactly one main H1');
    assert.equal(await page.locator('main .scene').count(),9,'Nine named chapters preserved');
    assert.equal(await page.locator('main .gesture-dock').count(),0,'No decorative hand illustrations should remain');
    assert.equal(await page.locator('.network-experience').count(),0,'Legacy fixed illustration removed');
    assert.equal(await page.locator('main svg.gesture-svg').count(),0,'Illustration SVG still mounted');
    assert.equal(await page.locator('main .cin-kicker').count(),9);
    const labels=await page.locator('main .cin-kicker').allTextContents();
    assert.ok(labels.every(label=>!/\d|[\/]/.test(label)), 'Numbers and slash still found in chapter eyebrows '+labels.join(', '));
    const boxes=await page.evaluate(()=>{
      const max=document.documentElement.scrollWidth,view=innerWidth;
      const headings=[...document.querySelectorAll('main h1,main h2')].map(el=>{
        const rect=el.getBoundingClientRect();
        return {id:el.id||el.textContent.slice(0,22),size:parseFloat(getComputedStyle(el).fontSize),
          left:rect.left,right:rect.right,width:rect.width};
      });
      return {max,view,headings};
    });
    assert.ok(boxes.max<=width+2,'Horizontal overflow '+width+'px: '+JSON.stringify(boxes));
    for(const heading of boxes.headings){
      assert.ok(heading.left>=-2&&heading.right<=width+2,'Heading outside viewport '+width+'px '+JSON.stringify(heading));
      assert.ok(heading.size>=35,'Heading became unreadably tiny at '+width+'px '+JSON.stringify(heading));
      assert.ok(heading.size<=256,'Heading exceeds 16rem upper typography boundary '+JSON.stringify(heading));
    }
    // Every section must have a semantic heading and must not be empty whitespace.
    for(const id of sections){
      const sc=page.locator('#'+id);
      assert.equal(await sc.count(),1);
      assert.ok(await sc.locator('h1,h2').count()>0,'Missing chapter heading '+id);
      const dimensions=await sc.evaluate(el=>{
        const r=el.getBoundingClientRect();
        const content=[...el.querySelectorAll('h1,h2,p,a,button,img')].filter(n=>{
          const css=getComputedStyle(n);
          return css.display!=='none' && css.visibility!=='hidden' && !n.closest('[hidden]');
        }).map(n=>n.getBoundingClientRect());
        const usable=content.filter(x=>x.width>0&&x.height>0);
        const lower=Math.max(...usable.map(x=>x.bottom),r.top);
        return {height:r.height,emptyAfter:Math.max(0,r.bottom-lower)};
      });
      assert.ok(dimensions.emptyAfter<Math.max(180,height*.25),
        'Excessive empty chapter trailing area '+id+' at '+width+': '+JSON.stringify(dimensions));
      await capture(page,width+'-'+id,id);
    }
    await checkImages(page);
    await capture(page,width+'-footer','footer');
    assert.equal(await page.locator('footer .cin-footer-oversized-logo img').count(),1);
    assert.ok(await page.locator('a.cin-skip').count()===1,'Missing keyboard skip link');
    assert.equal(await page.locator('main').count(),1);

    if(width===1440){
      const hrefs=await page.locator('a[href^="#"]').evaluateAll(links=>links
        .map(a=>a.getAttribute('href')).filter(h=>h&&h!=='#'));
      for(const href of hrefs)assert.equal(await page.locator(href).count(),1,'Broken anchor '+href);
      const toggle=page.getByRole('button',{name:'Switch to light theme'});
      await toggle.click();
      assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
      await page.getByRole('button',{name:'Switch to dark theme'}).click();
      assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');

      const selected=page.locator('.service-line');
      assert.equal(await selected.count(),4);
      for(let i=0;i<4;i++){
        const button=selected.nth(i).locator('button');
        await button.click();
        assert.equal(await button.getAttribute('aria-expanded'),'true');
        assert.ok(await selected.nth(i).locator('.cin-service-details p').isVisible(),'Service details hidden');
        const title=await button.locator('.cin-service-name').innerText();
        assert.equal(await page.locator('.cin-stage-caption strong').innerText(),title);
      }
      const productTabs=page.getByRole('tab');
      assert.equal(await productTabs.count(),5);
      await page.getByRole('tab',{name:/L7 Nexus/}).click();
      assert.equal(await page.locator('[role="tabpanel"] h3').innerText(),'L7 Nexus');
      assert.equal(await page.locator('[role="tabpanel"]').getAttribute('tabindex'),'0');
      await page.getByRole('tab',{name:/L7 Nexus/}).press('ArrowRight');
      assert.equal(await page.locator('[role="tabpanel"] h3').innerText(),'L7 Insights');
      const questions=page.locator('#faq h3 button');
      assert.equal(await questions.count(),3);
      await questions.nth(1).click();
      assert.equal(await questions.nth(1).getAttribute('aria-expanded'),'true');
      assert.ok(await page.locator('#faq [role="region"]').nth(1).isVisible());
      await questions.nth(1).click();
      assert.equal(await questions.nth(1).getAttribute('aria-expanded'),'false');
      assert.equal(await page.locator('a[href="tel:+918137979401"]').count()>0,true);
      assert.equal(await page.locator('a[href="mailto:info@ladder7.in"]').count()>0,true);
    }
    if(width<=430){
      const menu=page.getByRole('button',{name:'Open menu'});
      await menu.click();
      assert.equal(await page.getByRole('button',{name:'Close menu'}).getAttribute('aria-expanded'),'true');
      assert.ok(await page.locator('#mobile-navigation a').first().evaluate(el=>el===document.activeElement),'Focus should enter opened mobile menu');
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('button',{name:'Open menu'}).getAttribute('aria-expanded'),'false');
      assert.ok(await page.getByRole('button',{name:'Open menu'}).evaluate(el=>el===document.activeElement),'Escape returns focus to menu button');
    }
    console.log('PASS '+width+'x'+height+': nine chapters, editorial scaling, image assets, compact grids, accessibility checks');
    await page.close();
  }
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await reduced.goto(origin,{waitUntil:'networkidle'});
  assert.equal(await reduced.locator('.gesture-dock').count(),0);
  const html=await reduced.locator('html').evaluate(el=>getComputedStyle(el).scrollBehavior);
  assert.equal(html,'auto','Reduced-motion visitors should not have forced smooth scrolling');
  await reduced.close();
  assert.deepEqual(failures,[],'Browser console errors '+failures.join('\n'));
  console.log('PASS reduced motion / nine viewport smoke tests');
} finally {
  await browser.close();
}
