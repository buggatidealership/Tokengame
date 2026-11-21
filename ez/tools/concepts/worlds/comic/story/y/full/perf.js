// node perf.js [mode now|full] [runs 3]: main-thread cost on a 4x slower CPU at 390x844: the overlay's build, idle time per 6 s at five places, a slow scroll
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
const MODE=process.argv[2]||'full',RUNS=+(process.argv[3]||3);
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const out=[];
 for(let k=0;k<RUNS;k++){const t0=Date.now();const {p,er}=await open(b,390,MODE,{dpr:2,take:process.env.TAKE||'ink',wait:800});const cdp=await p.context().newCDPSession(p);
  await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  const M=async()=>{const r=await cdp.send('Performance.getMetrics');const g=n=>r.metrics.find(m=>m.name===n).value;return g('TaskDuration')};
  /* the overlay's own build, rerun on the throttled CPU (what a width change costs) */
  let build=null;if(MODE!=='now'){const a=await M();const ms=await p.evaluate(()=>window.__cbRebuild());await p.waitForTimeout(1500);build={ms:+ms.toFixed(0),task:+((await M())-a).toFixed(2)}}
  const idle={};for(const [nm,sel] of [['cover','#wc-book .wc-cover'],['models','#wc-book .wc-chars'],['rounds','#wc-book .wc-season'],['lucky','#wc-book .wc-splash'],['bet','#wc-book .wc-bet']]){
    await p.evaluate(s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY)},sel);await p.waitForTimeout(1500);const a=await M();await p.waitForTimeout(6000);idle[nm]=+((await M())-a).toFixed(2)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
  const sc=await p.evaluate(()=>new Promise(res=>{const H=document.documentElement.scrollHeight-innerHeight,T=9000,t0=performance.now();let fr=[],last=t0;
    const f=t=>{fr.push(t-last);last=t;const k=Math.min(1,(t-t0)/T);scrollTo(0,H*k);if(k<1)requestAnimationFrame(f);else{const long=fr.filter(x=>x>50).length;res({fps:+(fr.length/(T/1000)).toFixed(1),long})}};requestAnimationFrame(f)}));
  out.push({run:k,build,idle,scroll:sc,err:er.length});console.log(JSON.stringify(out[out.length-1]));await p.close()}
 const med=a=>a.slice().sort((x,y)=>x-y)[Math.floor(a.length/2)];const keys=Object.keys(out[0].idle);
 console.log(MODE,'median idle s per 6 s',JSON.stringify(Object.fromEntries(keys.map(k=>[k,med(out.map(o=>o.idle[k]))]))),'scroll fps',med(out.map(o=>o.scroll.fps)),'long frames',med(out.map(o=>o.scroll.long)));
 await b.close()})();
