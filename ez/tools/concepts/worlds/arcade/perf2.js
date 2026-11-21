// node perf2.js [runs] : DOMContentLoaded and cover-lift at 390x844 on a 4x slower CPU, X2+ and X4+ interleaved (medians)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
const N=+(process.argv[2]||3),pages=(process.env.PAGES||'v46-live-x2plus.html,v48-live-x4plus.html').split(','),res={};
(async()=>{const b=await chromium.launch();
 for(let i=0;i<N;i++)for(const pg of pages){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();await FONTS(p);
  const s=await ctx.newCDPSession(p);await s.send('Emulation.setCPUThrottlingRate',{rate:4});
  await p.goto('http://localhost:8897/'+pg,{waitUntil:'load',timeout:180000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:180000});
  const t=await p.evaluate(()=>{const m=performance.getEntriesByName('x2p-shown')[0],n=performance.getEntriesByType('navigation')[0],w=performance.getEntriesByName('wa-done')[0];return [m?Math.round(m.startTime):-1,Math.round(n.domContentLoadedEventStart),w?Math.round(w.startTime):-1]});
  (res[pg]=res[pg]||[]).push(t);console.log(pg,'lift',t[0],'dcl',t[1],'world',t[2]);await ctx.close()}
 const med=a=>{a=a.slice().sort((x,y)=>x-y);return a[a.length>>1]};
 for(const pg of pages){console.log(pg,'median lift',med(res[pg].map(x=>x[0])),'dcl',med(res[pg].map(x=>x[1])),'world',med(res[pg].map(x=>x[2])))}
 await b.close()})();
