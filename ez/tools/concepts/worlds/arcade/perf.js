// node perf.js [runs] : cover-lift time (performance mark x2p-shown) at 390x844 on a 4x slower CPU, X2+ and X4+ interleaved
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
const N=+(process.argv[2]||3),pages=['v46-live-x2plus.html','v48-live-x4plus.html'],res={};
(async()=>{const b=await chromium.launch();
 for(let i=0;i<N;i++)for(const pg of pages){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();await FONTS(p);
  const s=await ctx.newCDPSession(p);await s.send('Emulation.setCPUThrottlingRate',{rate:4});
  await p.goto('http://localhost:8897/'+pg,{waitUntil:'load',timeout:180000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:180000});
  const t=await p.evaluate(()=>{const m=performance.getEntriesByName('x2p-shown')[0];return m?Math.round(m.startTime):-1});
  // idle main-thread work for 6 s after the lift
  await s.send('Performance.enable');const a=await s.send('Performance.getMetrics');await p.waitForTimeout(6000);const z=await s.send('Performance.getMetrics');
  const g=(o,n)=>o.metrics.find(m=>m.name===n).value;const busy=((g(z,'TaskDuration')-g(a,'TaskDuration'))).toFixed(2);
  (res[pg]=res[pg]||[]).push([t,+busy]);console.log(pg,'lift',t,'ms, idle work in 6 s:',busy,'s');await ctx.close()}
 for(const pg of pages){const L=res[pg].map(x=>x[0]).sort((a,b)=>a-b),B=res[pg].map(x=>x[1]).sort((a,b)=>a-b);console.log(pg,'median lift',L[L.length>>1],'ms, median idle work',B[B.length>>1],'s per 6 s')}
 await b.close()})();
