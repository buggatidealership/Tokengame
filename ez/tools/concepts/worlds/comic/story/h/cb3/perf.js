// node perf.js [runs]: main-thread work per 6 s with the card back on screen at 390, 4x slower CPU, foil drifting vs still
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const RUNS=+(process.argv[2]||3),PORT=process.env.PORT||8993;
(async()=>{const b=await chromium.launch();const res={drift:[],still:[]};
for(let i=0;i<RUNS;i++)for(const mode of ['drift','still']){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);
 const s=await ctx.newCDPSession(p);
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html?${Date.now()}#/round/80`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(2500);
 if(mode==='still')await p.addStyleTag({content:'#x2pRm .cb .cb-hf{animation:none!important}'});
 await s.send('Emulation.setCPUThrottlingRate',{rate:4});await s.send('Performance.enable');await p.waitForTimeout(1500);
 const m0=(await s.send('Performance.getMetrics')).metrics;const f0=await p.evaluate(()=>new Promise(r=>{let n=0,t=performance.now();(function k(){n++;if(performance.now()-t<6000)requestAnimationFrame(k);else r(n)})()}));
 const m1=(await s.send('Performance.getMetrics')).metrics;const g=(m,k)=>m.find(x=>x.name===k).value;
 const run=await p.evaluate(()=>document.querySelector('#x2pRm .cb-hf').getAnimations().length);
 res[mode].push({task:+(g(m1,'TaskDuration')-g(m0,'TaskDuration')).toFixed(3),layout:+(g(m1,'LayoutDuration')-g(m0,'LayoutDuration')).toFixed(3),style:+(g(m1,'RecalcStyleDuration')-g(m0,'RecalcStyleDuration')).toFixed(3),fps:+(f0/6).toFixed(1),anims:run});
 await ctx.close()}
const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];
for(const k of ['drift','still'])console.log(k,JSON.stringify(res[k]),'median task',med(res[k].map(x=>x.task)),'fps',med(res[k].map(x=>x.fps)));
await b.close()})();
