// node interact.js [width]: flip, arrows, close, the foil's live state and reduced motion on the turned card back
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const W=+(process.argv[2]||390),PORT=process.env.PORT||8993;
(async()=>{const b=await chromium.launch();const out=[];
for(const rm of ['no-preference','reduce']){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},reducedMotion:rm});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html?${Date.now()}#/round/80`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(2500);
 const st=()=>p.evaluate(()=>{const c=document.querySelector('#x2pRm .card'),cb=c&&c.querySelector('.cb'),hf=cb&&cb.querySelector('.cb-hf');
   const a=hf?hf.getAnimations():[];return {n:c&&c.getAttribute('data-n'),flipped:c&&c.classList.contains('flipped'),live:!!(cb&&cb.classList.contains('cb-live')),anims:a.length,running:a.some(x=>x.playState==='running'),tx:hf?getComputedStyle(hf).transform:null,hash:location.hash}});
 const r={rm,front:await st()};
 await p.click('#x2pRm .card .face.front [data-flip]').catch(async()=>{await p.evaluate(()=>document.querySelector('#x2pRm .card').click())});await p.waitForTimeout(1500);r.back=await st();
 const t0=await p.evaluate(()=>getComputedStyle(document.querySelector('#x2pRm .cb-hf')).transform);await p.waitForTimeout(1000);const t1=await p.evaluate(()=>getComputedStyle(document.querySelector('#x2pRm .cb-hf')).transform);r.moved=t0!==t1;
 // the plate's own "See the film" turns it back
 await p.click('#x2pRm .cb .cb-flip');await p.waitForTimeout(1500);r.afterPlateFlip=await st();
 await p.keyboard.press('ArrowRight');await p.waitForTimeout(2500);r.arrowRight=await st();
 await p.keyboard.press('ArrowLeft');await p.waitForTimeout(2500);r.arrowLeft=await st();
 // turn to the back again, then close
 await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(1500);r.back2=await st();
 await p.keyboard.press('Escape');await p.waitForTimeout(1500);r.closed=await p.evaluate(()=>({rm:!!document.getElementById('x2pRm'),hash:location.hash}));
 r.errors=er;r.cbErr=await p.evaluate(()=>window.__x2pCbErr?String(window.__x2pCbErr):'');r.sw=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
 out.push(r);await ctx.close()}
console.log(JSON.stringify(out,null,1));await b.close()})();
