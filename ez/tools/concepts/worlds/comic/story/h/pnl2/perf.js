// node perf.js <take> [runs]: cost on a 4x slower CPU at 390x844. Mounts the take off screen, throttles, then scrolls it into view
// (lines draw in) and measures 3 s: frames per second (rAF count) and main-thread time (Performance metrics TaskDuration); then a
// window switch (3 s), then 6 s idle on screen (the quiet loop). Also the same idle 6 s on today's live section for comparison.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const T=process.argv[2]||'a',N=+(process.argv[3]||3),rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8'),LIB=()=>rd('../pnl/_lib.js')+rd('_g.js')+rd('_s.js'),CSS=t=>rd('../pnl/_c.css')+rd('_s.css');
const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];
(async()=>{const b=await chromium.launch();const R={draw:[],sw:[],idle:[]};
for(let k=0;k<N;k++){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
 await p.goto(`http://localhost:${process.env.PORT||8961}/v47-live-x3plus.html#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('.wc-splash .wc10-ch')&&document.querySelector('#wc-pfv-pnl .wc-pf-r'),null,{timeout:120000});await p.waitForTimeout(2000);
 if(T!=='now'){await p.addStyleTag({content:CSS(T)});await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');(s.previousElementSibling||s).scrollIntoView();scrollBy(0,-1600)});
  await p.addScriptTag({content:LIB()+rd(T+'.js')+';PNmount()'});await p.waitForTimeout(1500)}
 const c=await p.context().newCDPSession(p);await c.send('Performance.enable');await c.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(800);
 const meas=async(fn,ms)=>{const m0=(await c.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;
   await p.evaluate(()=>{window.__fr=0;const f=()=>{window.__fr++;window.__raf=requestAnimationFrame(f)};window.__raf=requestAnimationFrame(f)});const t=Date.now();await fn();await p.waitForTimeout(ms);
   const fr=await p.evaluate(()=>{cancelAnimationFrame(window.__raf);return window.__fr});const m1=(await c.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;return {fps:+(fr/((Date.now()-t)/1000)).toFixed(1),main:+(m1-m0).toFixed(2)}};
 if(T!=='now'){R.draw.push(await meas(()=>p.evaluate(()=>{document.querySelector('.wc-splash').scrollIntoView()}),3000));
  R.sw.push(await meas(()=>p.click('.pn [data-win="d7"]'),3000));}
 else await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');s.scrollIntoView()});
 await p.waitForTimeout(2500);R.idle.push(await meas(async()=>{},6000));await p.context().close()}
const S=k=>R[k].length?{fps:med(R[k].map(x=>x.fps)),main_s:med(R[k].map(x=>x.main))}:null;
console.log(T,JSON.stringify({draw_3s:S('draw'),switch_3s:S('sw'),idle_6s:S('idle'),runs:N}));await b.close()})();
