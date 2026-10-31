// node perf.js <takes now,a,b,c,d> [runs=3] : 390x844, CPU throttled 4x, wheel-scroll from the cover to the NVIDIA bet at a steady pace.
// Reports frames per second, frames over 50 ms, worst frame, and main-thread task time during the scroll (CDP TaskDuration), median of runs.
const R=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const TS=process.argv[2].split(','),N=+(process.argv[3]||3);
(async()=>{const b=await chromium.launch();const res={};
for(let r=0;r<N;r++)for(const t of TS){const {ctx,p}=await R.open(b,390,844,2);await R.inject(p,t);await p.waitForTimeout(2000);
 const end=await p.evaluate(()=>{const e=document.querySelector('#wc-book > .wc-bet');const st=getComputedStyle(e).position==='sticky';if(st)e.style.position='static';const y=e.getBoundingClientRect().top+scrollY;if(st)e.style.position='';return y});
 const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(1500);
 await p.mouse.move(195,420);const tm=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
 const m0=await tm();await p.evaluate(()=>{window.__fr=[];const f=t=>{window.__fr.push(t);if(window.__go)requestAnimationFrame(f)};window.__go=1;requestAnimationFrame(f)});
 for(let y=0;y<end;y+=100){await p.mouse.wheel(0,100);await p.waitForTimeout(70)}await p.waitForTimeout(400);
 const m1=await tm();const m=await p.evaluate(()=>{window.__go=0;const f=window.__fr;const d=f.slice(1).map((x,i)=>x-f[i]);const T=(f[f.length-1]-f[0])/1000;return {fps:+(d.length/T).toFixed(1),long:d.filter(x=>x>50).length,worst:Math.round(Math.max(...d)),secs:+T.toFixed(1)}});
 m.task=+(m1.TaskDuration-m0.TaskDuration).toFixed(2);m.layout=+(m1.LayoutDuration-m0.LayoutDuration).toFixed(2);m.style=+(m1.RecalcStyleDuration-m0.RecalcStyleDuration).toFixed(2);
 (res[t]=res[t]||[]).push(m);console.log(r,t,JSON.stringify(m));await ctx.close()}
const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];
for(const t of TS){const a=res[t];console.log('MEDIAN',t,JSON.stringify({fps:med(a.map(x=>x.fps)),long50:med(a.map(x=>x.long)),worst:med(a.map(x=>x.worst)),mainThreadS:med(a.map(x=>x.task)),secs:med(a.map(x=>x.secs)),style:med(a.map(x=>x.style)),layout:med(a.map(x=>x.layout))}))}
await b.close()})();
