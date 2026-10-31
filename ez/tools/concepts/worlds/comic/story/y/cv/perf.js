// node perf.js [runs 3]: at 390x844 on a 4x slower CPU, the cover at the top of the page: script time to build each take, and main-thread work per 6 s sitting still (today vs takes).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const R=+(process.argv[2]||3),TS=(process.argv[3]||'now,c1,c2,c3,c4').split(','),rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8'),med=a=>{const s=a.slice().sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const res={};
 for(let i=0;i<R;i++)for(const t of TS){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
  await p.goto('http://localhost:8927/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForTimeout(1500);const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  let build=0;if(t!=='now'){await p.addStyleTag({content:rd('_cv.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_cv.js')});
    build=await p.evaluate(src=>{const t0=performance.now();(0,eval)(src);return performance.now()-t0},rd(t+'.js'))}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(+(process.env.WARM||1500));
  const m=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
  const a=await m();await p.waitForTimeout(6000);const z=await m();
  (res[t]=res[t]||{build:[],idle:[]});res[t].build.push(build);res[t].idle.push(z.TaskDuration-a.TaskDuration);await p.close()}
 for(const t in res)console.log(t,'build',med(res[t].build).toFixed(0)+'ms','idle/6s',med(res[t].idle).toFixed(2)+'s',JSON.stringify(res[t].idle.map(v=>+v.toFixed(2))));await b.close()})();
