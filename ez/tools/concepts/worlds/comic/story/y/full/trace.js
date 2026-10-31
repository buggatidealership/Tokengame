// node trace.js : main-thread events during a 9 s scroll at 4x CPU, summed by name (MODE=now|full, CBNO switches)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p}=await open(b,390,process.env.MODE||'full',{dpr:2,wait:600});const cdp=await p.context().newCDPSession(p);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1000);
 const ev=[];cdp.on('Tracing.dataCollected',d=>ev.push(...d.value));const done=new Promise(r=>cdp.once('Tracing.tracingComplete',r));
 await cdp.send('Tracing.start',{categories:'devtools.timeline,disabled-by-default-devtools.timeline',transferMode:'ReportEvents'});
 await p.evaluate(()=>new Promise(res=>{const H=document.documentElement.scrollHeight-innerHeight,T=9000,t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/T);scrollTo(0,H*k);if(k<1)requestAnimationFrame(f);else res()};requestAnimationFrame(f)}));
 await cdp.send('Tracing.end');await done;
 const main=ev.filter(e=>e.name==='thread_name'&&e.args&&e.args.name==='CrRendererMain').map(e=>e.tid);console.log('events',ev.length,'main tids',main.length);const S={};
 for(const e of ev){if(!main.includes(e.tid)||e.ph!=='X'||!e.dur)continue;S[e.name]=(S[e.name]||0)+e.dur/1000}
 console.log(process.env.MODE||'full',process.env.CBNO||'-',Object.entries(S).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([k,v])=>k+' '+v.toFixed(0)).join(' | '));await b.close()})();
