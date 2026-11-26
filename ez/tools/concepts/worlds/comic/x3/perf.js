// cover lift at 390x844 on a 4x slower CPU: X2+ vs X3+, interleaved, N runs each (performance mark x2p-shown)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
const N=+(process.env.N||3),PAGES=(process.env.PAGES||'v46-live-x2plus.html,v47-live-x3plus.html').split(',');
(async()=>{const b=await chromium.launch();const res={};PAGES.forEach(x=>res[x]=[]);
 for(let i=0;i<N;i++)for(const pg of PAGES){const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();await FONTS(p);
  const c=await ctx.newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:4});
  await p.goto('http://localhost:8897/'+pg+(process.env.HASH||''),{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  const t=await p.evaluate(()=>{const m=performance.getEntriesByName('x2p-shown')[0];return m?Math.round(m.startTime):-1});
  const idle=await p.evaluate(async()=>{await new Promise(r=>setTimeout(r,3000));return 0});
  res[pg].push(t);await ctx.close()}
 for(const k in res){const a=res[k].slice().sort((x,y)=>x-y);console.log(k,'runs',res[k].join(','),'median',a[Math.floor(a.length/2)])}await b.close()})();
