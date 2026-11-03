// node shoot.js <outdir> [widths 320,390,1280] [rounds 64,80,51,57,81] [DPR env]  -> <out>/<n>-<w>.png (the card) and full view
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'320,390,1280').split(',').map(Number),RS=(process.argv[4]||'64,80,51,57,81').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const PORT=process.env.PORT||8994,DPR=+process.env.DPR||2,PAGE=process.env.PAGE||'v46-live-x2plus.html';
(async()=>{const b=await chromium.launch();
 for(const W of WS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR});const p=await ctx.newPage();await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
  for(const n of RS){
   await p.goto(`http://127.0.0.1:${PORT}/${PAGE}?${Date.now()}#/round/${n}`,{waitUntil:'load',timeout:150000});
   await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});
   await p.waitForTimeout(1500);
   const k=await p.evaluate(()=>document.querySelector('#x2pRm .card').getAttribute('data-k'));
   if(k==='g'){await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');const f=c.querySelector('.face.front [data-flip]')||c.querySelector('[data-flip]');(f||c).click()});await p.waitForTimeout(1800)}
   await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
   await p.evaluate(()=>{document.activeElement&&document.activeElement.blur()});await p.evaluate(()=>document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}}));
   await p.screenshot({path:`${OUT}/view-${n}-${W}.png`});
   const el=await p.$('#x2pRm .card');if(el)await el.screenshot({path:`${OUT}/card-${n}-${W}.png`});
   const cb=await p.$('#x2pRm .cb');if(cb&&process.env.CB)await cb.screenshot({path:`${OUT}/cb-${n}-${W}.png`});
   if(process.env.CLOSE){for(const [sel,nm] of [['#x2pRm .cb-rows','rows'],['#x2pRm .cb-mw','mw']]){const e=await p.$(sel);if(e)await e.screenshot({path:`${OUT}/close-${nm}-${n}-${W}.png`})}}
   const err=await p.evaluate(()=>window.__x2pCbErr?String(window.__x2pCbErr.stack||window.__x2pCbErr):'');
   console.log(W,n,k,err||'',er.filter(e=>!/Failed to load resource/.test(e)).slice(0,3).join(' | '));er.length=0}
  await ctx.close()}
 await b.close()})();
