// node perf.js [runs 3] [width 390]: main-thread time over 6 s with each module sitting still on screen, 4x slower CPU (CDP), today vs p1 vs p2.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open,SEL}=require('./run.js');
const R=+(process.argv[2]||3),W=+(process.argv[3]||390);const med=a=>{const s=a.slice().sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const res={};
 for(let r=0;r<R;r++)for(const t of ['now','p1','p2'])for(const s of ['chars','season']){const {p,er}=await open(b,W,t,{dpr:W<600?2:1,live:1});
  await p.evaluate(sel=>{const n=document.querySelector(sel);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},SEL[s]);await p.waitForTimeout(5000);
  const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(1000);
  const g=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
  const a=await g();await p.waitForTimeout(6000);const z=await g();(res[s+' '+t]=res[s+' '+t]||[]).push((z.TaskDuration-a.TaskDuration)*1000);
  if(er.length)console.log(t,'errors',er);await p.close()}
 for(const k in res)console.log(W,k,'median of',R,':',Math.round(med(res[k])),'ms main thread / 6 s',JSON.stringify(res[k].map(Math.round)));
 await b.close()})();
