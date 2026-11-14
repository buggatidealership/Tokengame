// node perf.js <takes now,x1,x2,x3> [width] [runs]: 4x slower CPU (CDP), the board in view, three switches (24h, 7 days, Season);
// for each switch: main-thread task time and frames over the 1.8 s after the click, long frames (>50 ms), worst frame.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
const TS=process.argv[2].split(','),W=+(process.argv[3]||390),R=+(process.argv[4]||3);
const med=a=>{const s=a.slice().sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const res={};
 for(let r=0;r<R;r++)for(const t of TS){const {p,er}=await open(b,W,t,{dpr:W<600?2:1});
  const top=await p.evaluate(()=>document.querySelector('.ss-host').getBoundingClientRect().top+scrollY-16);await p.evaluate(y=>scrollTo(0,y),top);await p.waitForTimeout(3500);
  const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(800);
  for(const k of ['d1','d7','season']){
   const m0=(await cdp.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;
   const fr=await p.evaluate(k=>new Promise(res=>{const ts=[];const t0=performance.now();document.querySelector(`.ss-host .ss-swb[data-k="${k}"]`).click();(function f(t){ts.push(t);if(t-t0<1800)requestAnimationFrame(f);else res(ts)})(t0)}),k);
   const m1=(await cdp.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;
   const d=fr.slice(1).map((x,i)=>x-fr[i]);(res[t]=res[t]||[]).push({task:(m1-m0)*1000,frames:d.length,long:d.filter(x=>x>50).length,worst:Math.max(...d)});await p.waitForTimeout(400)}
  if(er.length)console.log(t,'errors',er.join('|'));await p.close()}
 for(const t of TS){const a=res[t];console.log(W,t,'median of',a.length,'switches: task',Math.round(med(a.map(x=>x.task))),'ms per 1.8 s; frames',med(a.map(x=>x.frames)),'(',(med(a.map(x=>x.frames))/1.8).toFixed(1),'fps ); long frames',med(a.map(x=>x.long)),'; worst',Math.round(med(a.map(x=>x.worst))),'ms')}
 await b.close()})();
