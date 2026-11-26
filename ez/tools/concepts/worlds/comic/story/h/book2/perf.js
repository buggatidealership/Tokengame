// node perf.js <takes now,a,b,c> [runs 3] : 4x slower CPU at 390x844; scrolls the cover opening (first stage or 1.6 screens) at a reader's pace; fps, frames over 50 ms, main-thread time
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
const TS=(process.argv[2]||'now,a,b,c').split(','),N=+process.argv[3]||3;
(async()=>{const b=await chromium.launch();const R={};
 for(let n=0;n<N;n++)for(const t of TS){const {ctx,p}=await open(b,t,390,{deviceScaleFactor:2});const s=await ctx.newCDPSession(p);
  await s.send('Emulation.setCPUThrottlingRate',{rate:4});await s.send('Performance.enable');await p.waitForTimeout(1500);
  const y1=await p.evaluate(()=>{const st=document.querySelector('.b2-stage');return st?st.offsetHeight-innerHeight:innerHeight*1.6});
  const m0=(await s.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;
  const r=await p.evaluate(y1=>new Promise(res=>{const fr=[];let last=performance.now();const t0=last,ms=5000;const f=t=>{fr.push(t-last);last=t;const k=Math.min(1,(t-t0)/ms);scrollTo({top:y1*k,behavior:'instant'});dispatchEvent(new Event('scroll'));k<1?requestAnimationFrame(f):res(fr)};requestAnimationFrame(f)}),y1);
  const m1=(await s.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;
  (R[t]=R[t]||[]).push({fps:r.length/5,long:r.filter(x=>x>50).length,worst:Math.round(Math.max(...r)),main:+(m1-m0).toFixed(2)});await ctx.close()}
 const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];
 for(const t of TS){const a=R[t];console.log(t,'fps',med(a.map(x=>x.fps)).toFixed(1),'long',med(a.map(x=>x.long)),'worst',med(a.map(x=>x.worst)),'main',med(a.map(x=>x.main)),'s')}
 await b.close()})();
