// node probe.js <out> : shoots today's #record at 390/1280 and prints the facts the takes use (port 8983)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 for(const W of [390,1280]){const p=await (await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:1})).newPage();await FONTS(p);
 await p.goto('http://127.0.0.1:8983/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
 const info=await p.evaluate(()=>{const s=document.getElementById('record');s.scrollIntoView();const r=s.getBoundingClientRect();const prev=s.previousElementSibling,next=s.nextElementSibling;
  const G=ROUNDS.filter(r=>r.a!=null&&r.out);return {w:r.width,x:r.left,h:r.height,y:r.top+scrollY,prev:prev&&prev.id,next:next&&next.id,kids:[...s.children].map(c=>c.className),
   n:G.length,last:G.slice(-8).map(r=>[r.n,r.co,r.ticker,r.out,r.a,r.win,r.resolves,(r.calls||[]).map(c=>c.join(':')).join(' '),!!FILMS[r.n],r.poster||null]),
   pend:(window.PENDING||[]).length,up:(window.UPCOMING||[]).length,models:Object.keys(MODELS),wins:[...new Set(G.map(r=>r.win))]}});
 console.log(W,JSON.stringify(info));
 await p.evaluate(()=>document.getElementById('record').scrollIntoView());await p.waitForTimeout(800);
 const bx=await p.evaluate(()=>{const r=document.getElementById('record').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
 await p.screenshot({path:`${OUT}/now-${W}.png`,clip:{x:0,y:bx.y-40,width:W,height:Math.min(bx.h+80,4000)},fullPage:true});await p.close()}
 await b.close()})();
