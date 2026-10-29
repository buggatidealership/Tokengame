const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(let i=0;i<2;i++)for(const pg of ['v46-live-x2plus.html','v47-live-x3plus.html']){const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();await FONTS(p);
 const c=await ctx.newCDPSession(p);await c.send('Performance.enable');
 await p.goto('http://localhost:8897/'+pg,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(4000);
 await c.send('Emulation.setCPUThrottlingRate',{rate:4});
 const g=async()=>Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
 const a=await g();await p.waitForTimeout(6000);const z=await g();
 console.log(pg,'idle task s per 6s @4x:',(z.TaskDuration-a.TaskDuration).toFixed(2),'layouts',z.LayoutCount-a.LayoutCount,'styles',z.RecalcStyleCount-a.RecalcStyleCount);await ctx.close()}await b.close()})();
