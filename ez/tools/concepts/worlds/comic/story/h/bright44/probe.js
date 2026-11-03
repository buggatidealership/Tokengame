// node probe.js <W> : lists the Overview's shown sections in order (id/class, top, height, background) on the snapshot of the built X2+ page.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const W=+(process.argv[2]||390),PORT=process.env.PORT||8961,SNAP=process.env.SNAP||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/b44/v46-snap.html';
(async()=>{const b=await chromium.launch();const ph=W<600;const ctx=await b.newContext({viewport:{width:W,height:ph?844:900},deviceScaleFactor:1,isMobile:ph,hasTouch:ph,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(SNAP)}));
await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
const o=await p.evaluate(()=>{const out=[];document.querySelectorAll('main > *').forEach(s=>{const cs=getComputedStyle(s),r=s.getBoundingClientRect();if(cs.display==='none'||r.height<2)return;
 out.push([s.tagName,s.id,(s.className||'').toString().slice(0,60),Math.round(r.top+scrollY),Math.round(r.height),cs.backgroundColor,cs.backgroundImage.slice(0,90)])});
 const h=getComputedStyle(document.documentElement),bd=getComputedStyle(document.body);return {sec:out,html:[h.backgroundColor,h.backgroundImage.slice(0,200)],body:[bd.backgroundColor,bd.backgroundImage.slice(0,200)],H:document.documentElement.scrollHeight}});
console.log(JSON.stringify(o,null,1));await b.close()})();
