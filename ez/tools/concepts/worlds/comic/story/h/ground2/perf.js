// node perf.js <takes now,a,...> [runs=3] : 390x844, CPU throttled 4x, wheel-scroll the whole Overview at a steady pace; frames per second and long frames, median of runs
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const R=require('./run.js');
const TS=process.argv[2].split(','),N=+(process.argv[3]||3);
(async()=>{const b=await chromium.launch();const res={};
for(let r=0;r<N;r++)for(const t of TS){const {ctx,p}=await R.open(b,390,2);await R.inject(p,t);await p.waitForTimeout(2500);
 const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(1500);
 await p.mouse.move(195,420);
 await p.evaluate(()=>{window.__fr=[];const f=t=>{window.__fr.push(t);if(window.__go)requestAnimationFrame(f)};window.__go=1;requestAnimationFrame(f)});
 const H=await p.evaluate(()=>document.querySelector('.wc-back').getBoundingClientRect().bottom+scrollY);
 for(let y=0;y<H;y+=120){await p.mouse.wheel(0,120);await p.waitForTimeout(60)}
 const m=await p.evaluate(()=>{window.__go=0;const f=window.__fr;const d=f.slice(1).map((x,i)=>x-f[i]);const T=(f[f.length-1]-f[0])/1000;return {fps:+(d.length/T).toFixed(1),long:d.filter(x=>x>50).length,worst:Math.round(Math.max(...d)),secs:+T.toFixed(1)}});
 (res[t]=res[t]||[]).push(m);console.log(r,t,JSON.stringify(m));await ctx.close()}
const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];
for(const t of TS){const a=res[t];console.log('MEDIAN',t,'fps',med(a.map(x=>x.fps)),'long>50ms',med(a.map(x=>x.long)),'worst ms',med(a.map(x=>x.worst)))}
await b.close()})();
