// node coverperf.js [runs 3]: time to the cover lifting (html.x2p-world, no x2p-cur) at 390 on a 4x slower CPU, before (v47-zz-before-pop.html) vs after.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
const R=+(process.argv[2]||3),med=a=>{const s=a.slice().sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const res={before:[],after:[],popBuilt:[]};
 for(let i=0;i<R;i++)for(const [k,f] of [['before','v47-zz-before-pop.html'],['after','v47-live-x3plus.html']]){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
  const cdp=await p.context().newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});const t0=Date.now();
  await p.goto('http://localhost:8925/'+f,{waitUntil:'commit'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:180000,polling:100});res[k].push((Date.now()-t0)/1000);
  if(k==='after'){await p.waitForFunction(()=>document.documentElement.classList.contains('p1-ready'),null,{timeout:180000,polling:100});res.popBuilt.push((Date.now()-t0)/1000)}
  await p.close()}
 for(const k in res)console.log(k,'median',med(res[k]).toFixed(2),'s',JSON.stringify(res[k]));await b.close()})();
