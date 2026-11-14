// node perf.js [runs 3] [width 390]: main-thread time over 6 s with the section sitting still on screen, 4x slower CPU (CDP), today vs y1.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
const R=+(process.argv[2]||3),W=+(process.argv[3]||390);const med=a=>{const s=a.slice().sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const res={now:[],y1:[]};
 for(let r=0;r<R;r++)for(const t of ['now','y1']){const {p,er}=await open(b,W,t,{dpr:W<600?2:1});
  await p.evaluate(()=>{const n=document.querySelector('.wc-chars');scrollTo(0,n.getBoundingClientRect().top+scrollY-20)});await p.waitForTimeout(4000);
  const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(1000);
  const g=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
  const a=await g();await p.waitForTimeout(6000);const z=await g();
  res[t].push({task:(z.TaskDuration-a.TaskDuration)*1000,style:(z.RecalcStyleDuration-a.RecalcStyleDuration)*1000,layout:(z.LayoutDuration-a.LayoutDuration)*1000});
  if(er.length)console.log(t,'errors',er);await p.close()}
 for(const t in res)console.log(W,t,'median of',R,': task',Math.round(med(res[t].map(x=>x.task))),'ms / 6 s; style',Math.round(med(res[t].map(x=>x.style))),'ms; layout',Math.round(med(res[t].map(x=>x.layout))),'ms',JSON.stringify(res[t].map(x=>Math.round(x.task))));
 await b.close()})();
