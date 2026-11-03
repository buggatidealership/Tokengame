// node rec.js <out dir>: records the three takes that move, at 390x844 (motion on): C the press strikes and a Mag 7 plate finds its slab on the belt,
// E a monitor tunes the big screen, B a pack opens. Writes <out>/rec-<take>.webm (ffmpeg joins them into ez/x2p-h40-rounds.mp4).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});
const SNAP='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/h40rounds/v46-snap.html';
const css=fs.readFileSync(__dirname+'/_h40.css','utf8'),js=fs.readFileSync(__dirname+'/_h40.js','utf8');
(async()=>{const b=await chromium.launch();
 for(const T of ['C','E','B']){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true,recordVideo:{dir:OUT+'/raw-'+T,size:{width:390,height:844}}});
  const p=await ctx.newPage();await FONTS(p);await p.route(/v46-live-x2plus\.html/,r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(SNAP)}));
  await p.goto('http://127.0.0.1:8941/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pVit,null,{timeout:120000});
  await p.addStyleTag({content:css+'body>div:has(>.x2p-cw-bug),.x2p-cw{display:none!important}'});await p.evaluate(t=>window.__H40=t,T);
  await p.evaluate(()=>{document.querySelector('#record').scrollIntoView();scrollBy(0,-2000)});await p.addScriptTag({content:js});await p.waitForTimeout(1500);
  await p.evaluate(()=>document.querySelectorAll('#h40 img').forEach(i=>i.loading='eager'));await p.waitForTimeout(1500);
  await p.evaluate(()=>[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if((s==='fixed'||s==='sticky')&&!x.closest('#h40'))x.style.setProperty('display','none','important')}));
  const t0=Date.now();const mark=()=>Date.now()-t0;
  const sc=async(sel,blk)=>{await p.evaluate(([s,k])=>document.querySelector(s).scrollIntoView({block:k||'start',behavior:'smooth'}),[sel,blk]);await p.waitForTimeout(1300)};
  if(T==='C'){await sc('#h40 .pc-press','center');await p.waitForTimeout(1800);await sc('#h40 .pc-m7s','start');await p.tap('#h40 .pc-j[data-n="38"]');await p.waitForTimeout(2600);await p.tap('#h40 .pc-j[data-n="61"]');await p.waitForTimeout(2600)}
  if(T==='E'){await sc('#h40 .pe-scr','start');await p.evaluate(()=>{const v=document.querySelector('#h40 video');v&&v.play()});await p.waitForTimeout(2200);await p.tap('#h40 .pe-mon[data-n="38"]');await p.waitForTimeout(2600);await p.tap('#h40 .pe-mon[data-n="61"]');await p.waitForTimeout(2600)}
  if(T==='B'){await sc('#h40 .pb-hero','start');await p.waitForTimeout(1200);await sc('#h40 .pb-packs','start');await p.tap('#h40 .pb-pk[data-d="1"] .pb-pb');await p.waitForTimeout(1800);await p.evaluate(()=>scrollBy({top:420,behavior:'smooth'}));await p.waitForTimeout(1800)}
  const v=p.video();await ctx.close();fs.renameSync(await v.path(),OUT+'/rec-'+T+'.webm');console.log(T,'done',mark())}
 await b.close()})();
