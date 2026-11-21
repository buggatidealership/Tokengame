// node peek.js : shoot today's live section at 390 (DPR 2) and dump the data the takes need
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/h37rounds';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
 await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(S+'/v46-snap.html')}));
 await p.goto('http://127.0.0.1:8937/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pMagApi,null,{timeout:120000});await p.waitForTimeout(1500);
 const d=await p.evaluate(()=>{const A=window.__x2pMagApi;const lab=n=>{const z=document.querySelector(`#car .card[data-n="${n}"] .zlab`);if(!z)return null;const q=s=>(z.querySelector(s)||{}).textContent||'';return {ds:q('.zr .ds'),gr:q('.zr .gr')}};
  return {slots:A.slots.map(s=>s.r?{n:s.r.n,t:s.t,co:s.r.co,out:s.r.out,win:s.r.win,...lab(s.r.n)}:{u:s.u.n,t:s.t,co:s.u.co,res:s.u.resolves,called:s.u.called}),rest:A.REST.map(r=>({n:r.n,t:r.ticker,co:r.co,out:r.out,win:r.win,res:r.resolves,...lab(r.n)}))}});
 fs.writeFileSync(S+'/data.json',JSON.stringify(d,null,0));console.log(d.slots,d.rest.length,d.rest.slice(0,5));
 const box=await p.evaluate(()=>{const s=document.getElementById('record');s.scrollIntoView();const r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});await p.waitForTimeout(1500);
 await p.evaluate(()=>{document.querySelectorAll('#record img').forEach(i=>i.loading='eager')});await p.waitForTimeout(1500);
 await p.screenshot({path:S+'/now-390.png',clip:{x:0,y:box.y,width:390,height:box.h},fullPage:true});console.log(box);await b.close()})();
