// node perf.js <take now|a|b|c> : at 4x slower CPU, 390x844. Frames per second while the tab change plays (2.4 s after
// tapping Leaderboard) and main-thread time per 6 s sitting still at the top of the tab. Median of 3 runs.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const R=require('./run.js');
const T=process.argv[2]||'a',PORT=process.env.PORT||8961;
(async()=>{const b=await chromium.launch();const out=[];
for(let run=0;run<3;run++){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>window.SS&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000}).catch(()=>{});
 if(T!=='now')await R.inject(p,T);await p.waitForTimeout(2500);
 const c=await ctx.newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:4});await c.send('Performance.enable');
 await p.evaluate(()=>{window.__f=0;const f=()=>{window.__f++;requestAnimationFrame(f)};requestAnimationFrame(f)});
 const f0=await p.evaluate(()=>__f);const t0=Date.now();await p.click('header nav a[data-r="leaderboard"]');await p.waitForTimeout(2400);
 const fps=(await p.evaluate(()=>__f)-f0)/((Date.now()-t0)/1000);
 await p.waitForTimeout(2500);const m=async()=>Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
 const a=await m();await p.waitForTimeout(6000);const z=await m();
 out.push({fps:+fps.toFixed(1),idle:+(z.TaskDuration-a.TaskDuration).toFixed(2)});await ctx.close()}
const med=k=>out.map(o=>o[k]).sort((x,y)=>x-y)[1];console.log(T,JSON.stringify(out),'median fps',med('fps'),'idle s/6s',med('idle'));await b.close()})();
