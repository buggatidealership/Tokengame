// node perf.js <ids now,g4,g5> [runs 3]: 390x844, 4x slower CPU (CDP). Cover lift = ms from navigation to html.x2p-cur removed;
// warm scroll pass first (lazy images and films load), then an 8 s measured pass: frame-time median, p90, frames > 50 ms. With the ground injected inline before the page's scripts (so its cost counts). Scroll: 6 s of rAF-driven scrolling through the Overview, fps and frames > 50 ms.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const IDS=(process.argv[2]||'now,g5').split(','),N=+(process.argv[3]||3);const G4=fs.readFileSync(__dirname+'/_g4.js','utf8');
(async()=>{const b=await chromium.launch();const R={};
 for(let k=0;k<N;k++)for(const id of IDS){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});const p=await ctx.newPage();await FONTS(p);
  const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  if(id!=='now')await p.addInitScript(({id,src})=>{window.__G4=id;document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('script');s.textContent=src;document.head.appendChild(s)})},{id,src:G4});
  const t0=Date.now();await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'commit',timeout:180000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:180000,polling:50});const lift=Date.now()-t0;
  await p.waitForTimeout(4000);
  const pass=ms=>p.evaluate(ms=>new Promise(res=>{const H=document.getElementById('x2pSt').getBoundingClientRect().top+scrollY;let t0=null,last=null;const d=[];
   function f(t){if(t0===null){t0=last=t}else{d.push(t-last);last=t}const e=t-t0;scrollTo(0,H*Math.min(1,e/ms));if(e<ms)requestAnimationFrame(f);else{scrollTo(0,0);res(d)}}requestAnimationFrame(f)}),ms);
  await pass(4000);await p.waitForTimeout(4000);const d=(await pass(8000)).sort((a,b)=>a-b);const q=x=>+d[Math.floor(d.length*x)].toFixed(1);
  const sc={frames:d.length,fps:+(d.length/8).toFixed(1),medMs:q(.5),p90Ms:q(.9),over50:d.filter(x=>x>50).length,worstMs:+d[d.length-1].toFixed(0)};
  (R[id]=R[id]||[]).push({lift,...sc});console.log(id,k,lift,JSON.stringify(sc));await ctx.close()}
 const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];const S={};for(const id in R)S[id]={lift:med(R[id].map(x=>x.lift)),fps:med(R[id].map(x=>x.fps)),medMs:med(R[id].map(x=>x.medMs)),p90Ms:med(R[id].map(x=>x.p90Ms)),over50:med(R[id].map(x=>x.over50)),runs:R[id]};
 fs.writeFileSync(__dirname+'/perf.json',JSON.stringify(S,null,1));console.log(JSON.stringify(S,(k,v)=>k==='runs'?undefined:v));await b.close()})();
