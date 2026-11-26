// node cap.js <data.js> <ISO time> <out dir> : the live terminal (ez/v53-terminal.html, the code as served on earningszn.xyz) on its Upcoming tab at
// 390 wide, New York time, the clock fixed at that moment and ez-data.js swapped for that day's snapshot (git), in four layers so a video can
// scroll it as the phone does: bg.jpg (the fixed ground, one screen), content.png (the page, transparent, its sticky header and fixed tab bar
// left out but their room kept), top.png (the sticky header, transparent), nav.png (the tab bar). Files are served from disk by a route.
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [dat,iso,out]=process.argv.slice(2);const ROOT='/home/user/Tokengame/ez/';const DSF=2;
const MIME={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json','.woff2':'font/woff2'};
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:DSF,isMobile:true,hasTouch:true,timezoneId:'America/New_York',locale:'en-US'});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.clock.setFixedTime(new Date(iso));
await p.route('http://ez.local/**',r=>{const u=new URL(r.request().url());let f=decodeURIComponent(u.pathname.slice(1));
  if(/(^|\/)ez-data\.js$/.test(f))return r.fulfill({body:fs.readFileSync(dat,'utf8'),contentType:'application/javascript'});
  const fp=path.join(ROOT,f);if(!fp.startsWith(ROOT)||!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  r.fulfill({body:fs.readFileSync(fp),contentType:MIME[path.extname(fp)]||'application/octet-stream'})});
await p.goto('http://ez.local/v53-terminal.html#next');await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
const css=s=>p.evaluate(s=>{let e=document.getElementById('capcss');if(!e){e=document.createElement('style');e.id='capcss';document.head.appendChild(e)}e.textContent=s},s);
// the fixed ground alone, one screen
await css('body>*:not(script){visibility:hidden!important}');
await p.screenshot({path:out+'/bg.jpg',type:'jpeg',quality:92});
// the page without its ground, header and tab bar (their room kept)
const bgSel=await p.evaluate(()=>{const o=[];document.querySelectorAll('body *').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&s.zIndex==='-1')o.push(e)});return o.length});
await css('html,body{background:transparent!important}.top{visibility:hidden!important}#nav,nav{display:none!important}'+
  '*{}');await p.evaluate(()=>document.querySelectorAll('body *').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&s.zIndex==='-1')e.style.display='none'}));
// also the ::before/::after grounds on body/html
await p.evaluate(()=>{const s=document.createElement('style');s.textContent='html::before,html::after,body::before,body::after{display:none!important}';document.head.appendChild(s)});
await p.waitForTimeout(200);
const H=await p.evaluate(()=>document.documentElement.scrollHeight);
const geo=await p.evaluate(()=>{const g=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}};
  return {top:g('.top'),nav:g('#nav'),sec:[...document.querySelectorAll('#main>section, #main>div')].map(e=>{const r=e.getBoundingClientRect();return {c:e.className,y:r.top+scrollY,h:r.height}})}});
await p.screenshot({path:out+'/content.png',fullPage:true,omitBackground:true});
// the sticky header, transparent
await css('html,body{background:transparent!important}#main,#nav,nav{visibility:hidden!important}.top::before{display:none!important}');
await p.screenshot({path:out+'/top.png',omitBackground:true,clip:{x:0,y:0,width:390,height:Math.ceil(geo.top.y+geo.top.h+4)}});
// the tab bar
await css('#main{visibility:hidden!important}');await p.evaluate(()=>scrollTo(0,0));
const nb=await p.$('#nav');if(nb)await nb.screenshot({path:out+'/nav.png'});
fs.writeFileSync(out+'/geo.json',JSON.stringify({H,dsf:DSF,iso,data:path.basename(dat),...geo},null,1));
console.log('H',H,'fixed grounds',bgSel,'errs',errs.join('|')||'none',JSON.stringify(geo.top),JSON.stringify(geo.nav));await b.close()})();
