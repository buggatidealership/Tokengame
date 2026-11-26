// node perf.js now,T1,T2 : on a 4x slower CPU at 390px, switch the proof's tabs 4 times and measure frames and main-thread time
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const open=require('./_page.js');
(async()=>{const b=await chromium.launch();for(const t of process.argv[2].split(',')){const res=[];for(let run=0;run<3;run++){const ctx=await b.newContext({viewport:{width:390,height:720}});const errs=[];
 const p=await open(ctx,t,errs);const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(1500);
 await cdp.send('Performance.enable');const m0=Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
 await p.evaluate(()=>{window.__fr=[];let last=performance.now();(function f(t){window.__fr.push(t-last);last=t;window.__raf=requestAnimationFrame(f)})(last)});
 for(const v of ['hit','miss','sector','roi']){await p.click(`#learn .pt-tb [data-pt="${v}"]`);await p.waitForTimeout(1300)}
 const fr=await p.evaluate(()=>{cancelAnimationFrame(window.__raf);return window.__fr});const m1=Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
 const long=fr.filter(x=>x>50).length,worst=Math.max(...fr),fps=fr.length/(fr.reduce((a,b)=>a+b,0)/1000);
 res.push({fps:+fps.toFixed(1),long,worst:Math.round(worst),script:+(m1.ScriptDuration-m0.ScriptDuration).toFixed(2),layout:+(m1.LayoutDuration-m0.LayoutDuration).toFixed(2),style:+(m1.RecalcStyleDuration-m0.RecalcStyleDuration).toFixed(2),task:+(m1.TaskDuration-m0.TaskDuration).toFixed(2)});await ctx.close()}
 const med=k=>res.map(r=>r[k]).sort((a,b)=>a-b)[1];console.log(t,JSON.stringify({fps:med('fps'),long:med('long'),worst:med('worst'),task:med('task'),script:med('script'),style:med('style'),layout:med('layout')}))}
 await b.close()})();
