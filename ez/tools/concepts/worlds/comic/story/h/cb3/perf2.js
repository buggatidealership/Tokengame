// node perf2.js [runs]: as perf.js, with a trace: main-thread busy time and Paint / Layout / style events per 6 s, foil drifting vs still
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const RUNS=+(process.argv[2]||3),PORT=process.env.PORT||8993,TMP=process.env.TMP||'/tmp';
(async()=>{const b=await chromium.launch();const res={drift:[],still:[]};
for(let i=0;i<RUNS;i++)for(const mode of ['drift','still']){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);
 const s=await ctx.newCDPSession(p);
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html?${Date.now()}#/round/80`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(2500);
 if(mode==='still')await p.addStyleTag({content:'#x2pRm .cb .cb-hf{animation:none!important}'});
 await s.send('Emulation.setCPUThrottlingRate',{rate:4});await p.waitForTimeout(1500);
 const f=TMP+'/tr-'+mode+i+'.json';await b.startTracing(p,{path:f,categories:['devtools.timeline','disabled-by-default-devtools.timeline']});await p.waitForTimeout(6000);await b.stopTracing();
 const ev=JSON.parse(fs.readFileSync(f)).traceEvents;const main=ev.find(e=>e.name==='thread_name'&&e.args&&e.args.name==='CrRendererMain');
 const M=ev.filter(e=>main&&e.tid===main.tid&&e.pid===main.pid);
 const top=M.filter(e=>e.name==='RunTask'&&e.dur).reduce((a,e)=>a+e.dur,0)/1e6;
 const cnt=n=>M.filter(e=>e.name===n).length,sum=n=>+(M.filter(e=>e.name===n&&e.dur).reduce((a,e)=>a+e.dur,0)/1e3).toFixed(1);
 res[mode].push({busy:+top.toFixed(3),paint:cnt('Paint'),paintMs:sum('Paint'),layout:cnt('Layout'),style:cnt('UpdateLayoutTree'),layerize:sum('Layerize'),frames:ev.filter(e=>e.name==='DrawFrame').length});
 fs.unlinkSync(f);await ctx.close()}
const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];
for(const k of ['drift','still']){console.log(k,JSON.stringify(res[k]));console.log(' median busy',med(res[k].map(x=>x.busy)),'paint',med(res[k].map(x=>x.paint)),'paintMs',med(res[k].map(x=>x.paintMs)),'frames',med(res[k].map(x=>x.frames)))}
await b.close()})();
