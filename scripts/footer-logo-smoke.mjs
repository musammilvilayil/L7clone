import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const base=process.env.TEST_URL || 'http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
await mkdir('footer-screenshots',{recursive:true});

try {
  for(const [width,height] of [[320,700],[375,812],[390,844],[430,932],[768,1024],[1024,768],[1440,900],[1920,1080]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',err=>errors.push(err.message));
    await page.goto(base,{waitUntil:'networkidle'});

    const footer=page.locator('#footer');
    assert.equal(await footer.count(),1);
    for(const snippet of [
      '© LADDER7 2026',
      'Ladder7 is open for business Monday–Friday.',
      'ONLINE & ENGINEERING',
      'WEE SPACES, Ernakulam',
      'Kinfra Film & IT Park, Trivandrum',
      'NEWSLETTER SIGN UP',
      'Be the first to know about our latest AI platforms, digital strategies & engineering insights!',
      'SAY HELLO',
      '© 2026 Ladder7 NextStep Solutions LLP. All rights reserved.'
    ]) {
      assert.ok((await footer.innerText()).includes(snippet),
        `Required footer information missing at ${width}px: ${snippet}`);
    }
    for (const href of [
      'tel:+918137979401','mailto:info@ladder7.in','#contact','#capabilities',
      '#products','#top','https://www.linkedin.com/company/ladder7-nextstep-solutions-llp'
    ]) assert.ok(await footer.locator('a[href="'+href+'"]').count()>0,
      `Missing footer link: ${href}`);
    assert.equal(await footer.locator('.cin-footer-hello-grid a').count(),7,
      'Three navigation and four social links must remain usable');

    const input=footer.locator('input[type="email"]');
    assert.equal(await input.count(),1,'Accessible email request field is required');
    await input.fill('invalid-address');
    assert.equal(await input.evaluate(el=>el.validity.typeMismatch),true);
    await input.fill('visitor@example.com');
    assert.equal(await input.evaluate(el=>el.checkValidity()),true);

    const logo=footer.locator('.cin-footer-oversized-logo img');
    assert.equal(await logo.count(),1);
    await logo.evaluate(async img=>{
      img.loading='eager';
      if(!img.complete) await new Promise((resolve,reject)=>{
        img.addEventListener('load',resolve,{once:true});
        img.addEventListener('error',reject,{once:true});
      });
      if(img.decode)await img.decode();
    });
    if(width===1440 || width===390) {
      const sourcePixels=await logo.evaluate(img=>{
        const canvas=document.createElement('canvas');
        canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
        const context=canvas.getContext('2d',{willReadFrequently:true});
        if(!context)return null;
        context.drawImage(img,0,0);
        const rgba=context.getImageData(0,0,canvas.width,canvas.height).data;
        let minX=canvas.width,minY=canvas.height,maxX=-1,maxY=-1,total=0,opaque=0;
        for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
          const i=(y*canvas.width+x)*4;
          if(rgba[i+3]>32){
            opaque++;
            if(Math.max(rgba[i],rgba[i+1],rgba[i+2])>100){
              minX=Math.min(minX,x);minY=Math.min(minY,y);
              maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);total++;
            }
          }
        }
        const photo=img.getBoundingClientRect(),box=img.parentElement.getBoundingClientRect();
        return {natural:[canvas.width,canvas.height],opaqueFraction:opaque/(canvas.width*canvas.height),
          ink:{minX,minY,maxX,maxY,points:total},photo:{top:photo.top,height:photo.height,left:photo.left,width:photo.width},
          frame:{top:box.top,bottom:box.bottom,left:box.left,right:box.right,height:box.height}};
      });
      console.log('FOOTER_INKMAP '+width+' '+JSON.stringify(sourcePixels));
    }
    const measure=await footer.evaluate(el=>{
      const bounds=node=>{
        const r=node.getBoundingClientRect();
        return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};
      };
      const photo=el.querySelector('.cin-footer-oversized-logo img');
      return {
        footer:bounds(el),
        info:bounds(el.querySelector('.cin-footer-information')),
        legal:bounds(el.querySelector('.cin-footer-legal')),
        logo:bounds(el.querySelector('.cin-footer-oversized-logo')),
        image:bounds(photo),
        naturalRatio:photo.naturalWidth/photo.naturalHeight,
        imageRatio:photo.getBoundingClientRect().width/photo.getBoundingClientRect().height,
        overflow:document.documentElement.scrollWidth,
        viewport:window.innerWidth,
        inputVisible:getComputedStyle(el.querySelector('.cin-footer-email-field')).display!=='none',
        logoImage:photo.getAttribute('src')
      };
    });
    assert.ok(measure.footer.height<=height+3,
      `Footer must fit one viewport at ${width}px: ${JSON.stringify(measure)}`);
    if(width>600) {
      await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
      const headerVisibility=await page.evaluate(()=>{
        const top=document.querySelector('#footer').getBoundingClientRect().top;
        const header=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
        return {top,header};
      });
      assert.ok(headerVisibility.top >= headerVisibility.header - 2,
        `Footer intro hidden behind fixed navigation at ${width}px: ${JSON.stringify(headerVisibility)}`);
    }
    assert.ok(measure.logo.width>=width*.99,
      `Oversized Ladder7 logo must span nearly screen width at ${width}px`);
    assert.ok(measure.info.bottom<=measure.legal.y+2 &&
      measure.legal.bottom<=measure.logo.y+2,
      `Footer text/copyright/logo overlap at ${width}px`);
    assert.ok(measure.logo.bottom<=measure.footer.bottom+2,
      `Wordmark overflows footer at ${width}px`);
    assert.ok(measure.overflow<=width+2,
      `Unexpected horizontal overflow at ${width}px`);
    assert.ok(Math.abs(measure.naturalRatio-measure.imageRatio)<.014,
      `Logo ratio changed at ${width}px`);
    assert.ok(measure.inputVisible,'Newsletter email field hidden');
    if(width===1440 || width===390){
      await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
      await page.waitForTimeout(120);
      const scrollBounds=await page.evaluate(()=>{
        const footer=document.querySelector('#footer').getBoundingClientRect();
        const frame=document.querySelector('.cin-footer-oversized-logo').getBoundingClientRect();
        return {viewport:innerHeight,scrollY,scrollHeight:document.documentElement.scrollHeight,
          bodyScrollHeight:document.body.scrollHeight,
          footer:{top:footer.top,bottom:footer.bottom,height:footer.height},
          logo:{top:frame.top,bottom:frame.bottom,height:frame.height}};
      });
      console.log('FOOTER_VIEWPORT_BOTTOM '+width+' '+JSON.stringify(scrollBounds));
      await page.screenshot({path:`footer-screenshots/${width}-bottom-viewport.png`,animations:'disabled'});
    }
    await footer.screenshot({path:`footer-screenshots/${width}-dark.png`,animations:'disabled'});
    if(width===390 || width===1440) {
      await page.getByRole('button',{name:'Switch to light theme'}).click();
      await logo.evaluate(async img=>{if(img.decode)await img.decode()});
      assert.ok((await logo.getAttribute('src'))?.includes('logo-primary.webp'));
      await footer.screenshot({path:`footer-screenshots/${width}-light.png`,animations:'disabled'});
    }
    assert.deepEqual(errors,[],`JavaScript errors at ${width}px: ${errors.join(',')}`);
    console.log(`PASS ${width}x${height}: footer height ${Math.round(measure.footer.height)}px, logo width ${Math.round(measure.logo.width)}px, all text/links preserved`);
    await page.close();
  }
} finally {await browser.close();}
