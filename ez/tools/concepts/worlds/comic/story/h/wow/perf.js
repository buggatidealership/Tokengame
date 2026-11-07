// node perf.js: 4x slower CPU, 390x844. For none / exch / depth / vault mounted right after the cover: main-thread time
// (Performance.getMetrics TaskDuration) for the mount, 6 s sitting on the scene, and a scroll pass through it. Medians of 3.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const R=require('./run.js');
const sl=ms=>new Promise(r=>setTimeout(r,ms));const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];
(async()=>{const b=await chromium.launch();const out={};
 for(const id of ['none','exch','depth','vault'])for(let k=0;k<3;k++){const {ctx,p}=await R.open(b,390);const c=await ctx.newCDPSession(p);await c.send('Performance.enable');await c.send('Emulation.setCPUThrottlingRate',{rate:4});
  const td=async()=>{const m=(await c.send('Performance.getMetrics')).metrics;return m.find(x=>x.name==='TaskDuration').value};
  await sl(1500);let a=await td();
  await p.evaluate(id=>{const h=document.getElementById('wwhost');if(id==='exch')WW.exch.mount(h);if(id==='depth')WW.depth.mount(h);if(id==='vault')WW.vault.mount(h,{still:1})},id);await R.waitImgs(p);
  let bm=await td();await p.evaluate(()=>{const e=document.getElementById('wwhost');scrollTo(0,e.getBoundingClientRect().top+scrollY-40)});await sl(300);let i0=await td();await sl(6000);let i1=await td();
  for(let s=0;s<40;s++){await p.evaluate(()=>scrollBy(0,20));await sl(50)}let s1=await td();
  (out[id]=out[id]||[]).push([bm-a,i1-i0,s1-i1]);await ctx.close()}
 for(const id in out)console.log(id,'mount',med(out[id].map(x=>x[0])).toFixed(3),'idle6s',med(out[id].map(x=>x[1])).toFixed(3),'scroll2s',med(out[id].map(x=>x[2])).toFixed(3));await b.close()})();
