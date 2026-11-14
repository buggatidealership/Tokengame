// node perf.js a.html b.html [runs]: time to the cover lifting (html.x2p-cur gone) on a 4x slower CPU at 390x844, interleaved runs
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
const pages=process.argv.slice(2,4),N=+(process.argv[4]||3);
(async()=>{const b=await chromium.launch();const R={};for(let i=0;i<N;i++)for(const pg of pages){const c=await b.newContext({viewport:{width:390,height:844}});const p=await c.newPage();await FONTS(p);
  const s=await c.newCDPSession(p);await s.send('Emulation.setCPUThrottlingRate',{rate:4});
  await p.goto('http://localhost:8897/'+pg,{waitUntil:'commit'});const t=await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&performance.now(),null,{timeout:120000,polling:50});
  (R[pg]=R[pg]||[]).push(Math.round(await t.jsonValue()));await c.close()}
 for(const k in R){const v=R[k].slice().sort((a,b)=>a-b);console.log(k,R[k].join(' '),'median',v[v.length>>1])}await b.close()})();
