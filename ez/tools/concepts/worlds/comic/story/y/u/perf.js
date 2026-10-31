// node perf.js [runs 3] [width 390]: main-thread time over 6 s with the top of the Upcoming tab sitting still (cover and the first
// main event, its art drifting), 4x slower CPU (CDP), today vs u1 vs u2 vs u3. Then the same after a scroll to the middle of the tab.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
const R=+(process.argv[2]||3),W=+(process.argv[3]||390);const med=a=>{const s=a.slice().sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const res={};
 for(let r=0;r<R;r++)for(const t of ['now','u1','u2','u3'])for(const pos of ['top','mid']){const {p,er}=await open(b,W,t,{dpr:W<600?2:1,live:1});
  await p.evaluate(pos=>{const u=document.querySelector('#wc-up');scrollTo(0,pos==='top'?0:u.getBoundingClientRect().top+scrollY+u.offsetHeight*.45)},pos);await p.waitForTimeout(4000);
  const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(1000);
  const g=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
  const a=await g();await p.waitForTimeout(6000);const z=await g();(res[pos+' '+t]=res[pos+' '+t]||[]).push((z.TaskDuration-a.TaskDuration)*1000);
  if(er.length)console.log(t,'errors',er);await p.close()}
 for(const k in res)console.log(W,k,'median of',R,':',Math.round(med(res[k])),'ms main thread / 6 s',JSON.stringify(res[k].map(Math.round)));
 await b.close()})();
