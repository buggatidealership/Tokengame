// node perf.js <runs> [variants now,belt,deck]  4x CPU, 390x844 touch: cover lift (ms from navigation) and a slow scroll through "Every round so far"
// (fps from rAF, frames over 50 ms, main-thread task time during the scroll). Interleaved runs; medians.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
const RUNS=+(process.argv[2]||3),VS=(process.argv[3]||'now,belt').split(','),PORT=process.env.PORT||8961;
const med=a=>{const s=a.slice().sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
(async()=>{const b=await chromium.launch();const R={};VS.forEach(v=>R[v]={lift:[],fps:[],long:[],task:[]});
 for(let k=0;k<RUNS;k++)for(const V of VS){
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,hasTouch:true,isMobile:true});const p=await ctx.newPage();await FONTS(p);
  if(V==='deck')await p.addInitScript(()=>{window.__x2pSwipe='deck'});
  const c=await ctx.newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:4});await c.send('Performance.enable');
  const t0=Date.now();await p.goto(`http://127.0.0.1:${PORT}/${V==='now'?'before.html':'v46-live-x2plus.html'}`,{waitUntil:'domcontentloaded',timeout:200000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:200000,polling:50});R[V].lift.push(Date.now()-t0);
  await p.waitForFunction(()=>window.__x2pVit,null,{timeout:60000});await p.waitForTimeout(4000);
  const y=await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';const r=document.querySelector('#x2pVit').getBoundingClientRect();return scrollY+r.top-844});
  await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(1500);
  const m0=(await c.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;
  const s=await p.evaluate(()=>new Promise(res=>{const H=document.querySelector('#x2pVit').getBoundingClientRect().height+844;let last=performance.now(),t0=last,n=0,long=0,moved=0;
    function f(t){const dt=t-last;last=t;n++;if(dt>50)long++;const step=Math.min(8,H-moved);scrollBy(0,step);moved+=step;if(moved<H)requestAnimationFrame(f);else res({fps:n/((t-t0)/1000),long,ms:t-t0})}requestAnimationFrame(f)}));
  const m1=(await c.send('Performance.getMetrics')).metrics.find(x=>x.name==='TaskDuration').value;
  R[V].fps.push(+s.fps.toFixed(1));R[V].long.push(s.long);R[V].task.push(+((m1-m0)/(s.ms/1000)).toFixed(3));
  console.log(k,V,R[V].lift.at(-1),JSON.stringify(s),'task/s',R[V].task.at(-1));await ctx.close()}
 for(const V of VS)console.log(V,'lift',med(R[V].lift),'fps',med(R[V].fps),'long',med(R[V].long),'task s per s',med(R[V].task),JSON.stringify(R[V]));
 await b.close()})();
